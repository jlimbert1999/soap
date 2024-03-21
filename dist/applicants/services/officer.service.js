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
exports.OfficerService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const schemas_1 = require("../schemas");
const mongoose_2 = require("mongoose");
let OfficerService = class OfficerService {
    constructor(officerModel, levelModel, jobModel) {
        this.officerModel = officerModel;
        this.levelModel = levelModel;
        this.jobModel = jobModel;
    }
    async findAll({ limit, offset }) {
        const [officers, length] = await Promise.all([
            this.officerModel
                .find({})
                .populate('id_representantive')
                .populate({ path: 'cargo', populate: { path: 'nivel_id' } })
                .sort({ _id: -1 })
                .limit(limit)
                .skip(offset),
            this.officerModel.countDocuments({}),
        ]);
        return { officers, length };
    }
    async updateOfficer(id, data) {
        return await this.officerModel
            .findByIdAndUpdate(id, { id_representantive: data.endorsers }, { new: true })
            .populate('id_representantive')
            .populate({ path: 'cargo', populate: { path: 'nivel_id' } });
    }
    async searchByEndorser(id_endorser) {
        return await this.officerModel.find({ id_representantive: id_endorser }).populate('cargo');
    }
    async search(text, { limit, offset }) {
        const term = new RegExp(text, 'i');
        const data = await this.officerModel
            .aggregate()
            .addFields({
            fullname: {
                $concat: ['$nombre', ' ', '$paterno', ' ', '$materno'],
            },
        })
            .match({ $or: [{ fullname: term }, { dni: term }] })
            .project({ fullname: 0 })
            .facet({
            paginatedResults: [{ $skip: offset }, { $limit: limit }],
            totalCount: [{ $count: 'count' }],
        });
        const officers = data[0].paginatedResults;
        await this.officerModel.populate(officers, [
            { path: 'id_representantive' },
            { path: 'cargo', populate: { path: 'nivel_id' } },
        ]);
        const length = data[0].totalCount[0] ? data[0].totalCount[0].count : 0;
        return { officers, length };
    }
    async upload(data) {
        console.log(data);
        return { ok: true };
    }
};
exports.OfficerService = OfficerService;
exports.OfficerService = OfficerService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(schemas_1.Officer.name)),
    __param(1, (0, mongoose_1.InjectModel)(schemas_1.Level.name)),
    __param(2, (0, mongoose_1.InjectModel)(schemas_1.Job.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], OfficerService);
//# sourceMappingURL=officer.service.js.map