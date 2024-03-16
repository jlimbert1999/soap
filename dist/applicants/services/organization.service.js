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
exports.OrganizationService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const schemas_1 = require("../schemas");
const mongoose_2 = require("mongoose");
let OrganizationService = class OrganizationService {
    constructor(organizationModel) {
        this.organizationModel = organizationModel;
    }
    async create(organization) {
        const createOrganization = new this.organizationModel(organization);
        return await createOrganization.save();
    }
    async findAll() {
        const organizations = await this.organizationModel.find({}).sort({ _id: -1 });
        return { organizations };
    }
    async searchAvailable(term) {
        return await this.organizationModel.find({ name: new RegExp(term, 'i') }).limit(5);
    }
};
exports.OrganizationService = OrganizationService;
exports.OrganizationService = OrganizationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(schemas_1.Organization.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], OrganizationService);
//# sourceMappingURL=organization.service.js.map