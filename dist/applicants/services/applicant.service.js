"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicantService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const schemas_1 = require("../schemas");
const interfaces_1 = require("../interfaces");
let ApplicantService = class ApplicantService {
    constructor(applicantModel, endorserModel, organizationModel, officerModel, jobmodel, connection) {
        this.applicantModel = applicantModel;
        this.endorserModel = endorserModel;
        this.organizationModel = organizationModel;
        this.officerModel = officerModel;
        this.jobmodel = jobmodel;
        this.connection = connection;
    }
    async findAll({ limit, offset, date, status }) {
        const query = {
            status: status,
            ...(date && {
                date: {
                    $gte: new Date(date),
                    $lt: new Date(date + 24 * 60 * 60 * 1000),
                },
            }),
        };
        const [applicants, length] = await Promise.all([
            this.applicantModel.find(query).populate('endorsers').sort({ _id: -1 }).limit(limit).skip(offset),
            this.applicantModel.countDocuments(query),
        ]);
        return { applicants, length };
    }
    async search(text, { limit, offset, date, status }) {
        const term = new RegExp(text, 'i');
        const query = {
            status: status,
            ...(date && {
                date: {
                    $gte: new Date(date),
                    $lt: new Date(date + 24 * 60 * 60 * 1000),
                },
            }),
        };
        const data = await this.applicantModel
            .aggregate()
            .match(query)
            .addFields({
            fullname: {
                $concat: ['$firstname', ' ', '$middlename', ' ', '$lastname'],
            },
        })
            .match({ $or: [{ fullname: term }, { dni: term }] })
            .project({ fullname: 0 })
            .facet({
            paginatedResults: [{ $skip: offset }, { $limit: limit }],
            totalCount: [{ $count: 'count' }],
        });
        const applicants = data[0].paginatedResults;
        await this.applicantModel.populate(applicants, 'endorsers');
        const length = data[0].totalCount[0] ? data[0].totalCount[0].count : 0;
        return { applicants, length };
    }
    async create(applicant) {
        const applicantDB = await this.applicantModel.findOne({ dni: applicant.dni });
        if (applicantDB)
            throw new common_1.BadRequestException(`El CI: ${applicant.dni} ya existe`);
        const model = new this.applicantModel(applicant);
        const createdApplicant = await model.save();
        return await createdApplicant.populate('endorsers');
    }
    async update(id, applicant) {
        const applicantDB = await this.applicantModel.findById(id);
        if (!applicantDB)
            throw new common_1.BadRequestException('El postulante no existe');
        if (applicant.dni !== applicantDB.dni) {
            const duplicate = await this.applicantModel.findOne({ dni: applicant.dni });
            if (duplicate)
                throw new common_1.BadRequestException(`El CI: ${applicant.dni} ya existe`);
        }
        return await this.applicantModel.findByIdAndUpdate(id, applicant, { new: true }).populate('endorsers');
    }
    async updateOfficer(id_applicant, data) {
        return await this.applicantModel
            .findByIdAndUpdate(id_applicant, { documents: data.documents }, { new: true })
            .populate('endorsers');
    }
    async searchByEndorser(id_endorser) {
        return await this.applicantModel.find({ endorsers: id_endorser });
    }
    async accept(id_applicant, data) {
        const duplicate = await this.officerModel.findOne({ dni: data.dni });
        if (duplicate) {
            const fullname = `${duplicate.nombre} ${duplicate.paterno} ${duplicate.materno}`;
            throw new common_1.BadRequestException(`El funcionario ${fullname} ya tiene el CI: ${duplicate.dni}`.toUpperCase());
        }
        const session = await this.connection.startSession();
        try {
            session.startTransaction();
            const applicantDB = await this.applicantModel.findByIdAndUpdate(id_applicant, { candidate_for: data.name, status: interfaces_1.ApplicantStatus.COMPLETED, date: new Date() }, { session });
            const officer = new this.officerModel({
                nombre: applicantDB.firstname,
                paterno: applicantDB.middlename,
                materno: applicantDB.lastname,
                dni: applicantDB.dni,
                telefono: applicantDB.phone,
                cargo: data.id_job,
                oldcargo: data.id_job,
                id_representantive: applicantDB.endorsers.map((el) => el._id),
            });
            await officer.save({ session });
            await session.commitTransaction();
            return true;
        }
        catch (error) {
            await session.abortTransaction();
            throw new common_1.InternalServerErrorException('Error al crear funcionario');
        }
        finally {
            session.endSession();
        }
    }
    async searchAvailableJob(term) {
        const regex = new RegExp(term, 'i');
        return await this.jobmodel.aggregate([
            { $match: { nombre: regex } },
            {
                $lookup: {
                    from: 'funcionarios',
                    localField: '_id',
                    foreignField: 'cargo',
                    as: 'funcionario',
                },
            },
            {
                $match: {
                    funcionario: { $size: 0 },
                },
            },
            { $limit: 5 },
            {
                $project: {
                    funcionario: 0,
                },
            },
        ]);
    }
    async getCompleted(limit, offset, date) {
        const inDate = new Date(date);
        const query = {
            status: interfaces_1.ApplicantStatus.COMPLETED,
            date: {
                $gte: new Date(inDate.getFullYear(), inDate.getMonth(), inDate.getDate()),
                $lt: new Date(inDate.getFullYear(), inDate.getMonth(), inDate.getDate() + 1),
            },
        };
        const [applicants, length] = await Promise.all([
            this.applicantModel.find(query).populate('endorsers').sort({ _id: -1 }).limit(limit).skip(offset),
            this.applicantModel.countDocuments(query),
        ]);
        return { applicants, length };
    }
    async toggleAproved(id_applicant) {
        const applicantDB = await this.applicantModel.findById(id_applicant);
        if (!applicantDB)
            throw new common_1.BadRequestException(`applicant ${id_applicant} dont exist`);
        if (applicantDB.status === interfaces_1.ApplicantStatus.ACCEPTED) {
            await this.applicantModel.updateOne({ _id: id_applicant }, { documents: [], status: interfaces_1.ApplicantStatus.PENDING });
        }
        else {
            await this.applicantModel.updateOne({ _id: id_applicant }, { status: interfaces_1.ApplicantStatus.ACCEPTED, date: new Date() });
        }
    }
    async uploadData(data) {
        console.log(data);
        return { ok: true };
    }
};
exports.ApplicantService = ApplicantService;
exports.ApplicantService = ApplicantService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(schemas_1.Applicant.name)),
    __param(1, (0, mongoose_1.InjectModel)(schemas_1.Endorser.name)),
    __param(2, (0, mongoose_1.InjectModel)(schemas_1.Organization.name)),
    __param(3, (0, mongoose_1.InjectModel)(schemas_1.Officer.name)),
    __param(4, (0, mongoose_1.InjectModel)(schemas_1.Job.name)),
    __param(5, (0, mongoose_1.InjectConnection)()),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model, mongoose_2.default.Connection])
], ApplicantService);
//# sourceMappingURL=applicant.service.js.map