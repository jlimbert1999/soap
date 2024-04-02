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
exports.EndorserService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const schemas_1 = require("../schemas");
let EndorserService = class EndorserService {
    constructor(endorsertModel, applicantModel, officerModel) {
        this.endorsertModel = endorsertModel;
        this.applicantModel = applicantModel;
        this.officerModel = officerModel;
    }
    async findAll({ limit, offset }) {
        const data = await this.endorsertModel.aggregate().facet({
            results: [
                { $skip: offset },
                { $limit: limit },
                {
                    $lookup: {
                        from: 'funcionarios',
                        localField: '_id',
                        foreignField: 'id_representantive',
                        as: 'officers',
                    },
                },
                {
                    $lookup: {
                        from: 'applicants',
                        localField: '_id',
                        foreignField: 'endorsers',
                        as: 'applicants',
                    },
                },
                {
                    $project: {
                        _id: 1,
                        name: 1,
                        organization: 1,
                        officers: { $size: '$officers' },
                        applicants: { $size: '$applicants' },
                    },
                },
                {
                    $lookup: {
                        from: 'organizations',
                        localField: 'organization',
                        foreignField: '_id',
                        as: 'organization',
                    },
                },
                {
                    $unwind: {
                        path: '$organization',
                        preserveNullAndEmptyArrays: true,
                    },
                },
            ],
            length: [{ $count: 'total' }],
        });
        const endorsers = data[0].results;
        const length = data[0].length[0] ? data[0].length[0].total : 0;
        return { endorsers, length };
    }
    async search(term, { limit, offset }) {
        const regex = RegExp(term, 'i');
        const data = await this.endorsertModel
            .aggregate()
            .lookup({
            from: 'organizations',
            localField: 'organization',
            foreignField: '_id',
            as: 'organization',
        })
            .unwind({
            path: '$organization',
            preserveNullAndEmptyArrays: true,
        })
            .match({ $or: [{ name: regex }, { 'organization.name': regex }] })
            .facet({
            results: [
                { $skip: offset },
                { $limit: limit },
                {
                    $lookup: {
                        from: 'funcionarios',
                        localField: '_id',
                        foreignField: 'id_representantive',
                        as: 'officers',
                    },
                },
                {
                    $lookup: {
                        from: 'applicants',
                        localField: '_id',
                        foreignField: 'endorsers',
                        as: 'applicants',
                    },
                },
                {
                    $project: {
                        _id: 1,
                        name: 1,
                        organization: 1,
                        officers: { $size: '$officers' },
                        applicants: { $size: '$applicants' },
                    },
                },
            ],
            length: [{ $count: 'total' }],
        });
        const endorsers = data[0].results;
        const length = data[0].length[0] ? data[0].length[0].total : 0;
        return { endorsers, length };
    }
    async create(organization) {
        const createOrganization = new this.endorsertModel(organization);
        await createOrganization.save();
        return await createOrganization.populate('organization');
    }
    async update(id, organization) {
        return await this.endorsertModel.findByIdAndUpdate(id, organization, { new: true }).populate('organization');
    }
    async searchAvailable(term) {
        const regex = new RegExp(term, 'i');
        return await this.endorsertModel
            .aggregate()
            .lookup({
            from: 'organizations',
            localField: 'organization',
            foreignField: '_id',
            as: 'organization',
        })
            .unwind({
            path: '$organization',
            preserveNullAndEmptyArrays: true,
        })
            .match({ $or: [{ name: regex }, { 'organization.name': regex }] })
            .limit(8);
    }
};
exports.EndorserService = EndorserService;
exports.EndorserService = EndorserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(schemas_1.Endorser.name)),
    __param(1, (0, mongoose_1.InjectModel)(schemas_1.Applicant.name)),
    __param(2, (0, mongoose_1.InjectModel)(schemas_1.Officer.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], EndorserService);
//# sourceMappingURL=endorser.service.js.map