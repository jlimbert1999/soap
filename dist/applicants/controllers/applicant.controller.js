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
exports.ApplicantController = void 0;
const common_1 = require("@nestjs/common");
const dtos_1 = require("../dtos");
const services_1 = require("../services");
const dtos_2 = require("../../common/dtos");
let ApplicantController = class ApplicantController {
    constructor(applicantService) {
        this.applicantService = applicantService;
    }
    create(data) {
        return this.applicantService.create(data);
    }
    update(id, data) {
        return this.applicantService.update(id, data);
    }
    upload(data) {
        return this.applicantService.uploadData(data);
    }
    toggleAproved(id) {
        return this.applicantService.toggleAproved(id);
    }
    acept(data, id) {
        return this.applicantService.accept(id, data);
    }
    findAll(params) {
        return this.applicantService.findAll(params);
    }
    search(term, params) {
        return this.applicantService.search(term, params);
    }
    searchJobs(term) {
        return this.applicantService.searchAvailableJob(term);
    }
    searchByEndorser(id_endorser) {
        return this.applicantService.searchByEndorser(id_endorser);
    }
    getCompleted(date, param) {
        return this.applicantService.getCompleted(param.limit, param.offset, +date);
    }
    updateOfficers(id, body) {
        return this.applicantService.updateOfficer(id, body);
    }
};
exports.ApplicantController = ApplicantController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dtos_1.CreateApplicantDto]),
    __metadata("design:returntype", void 0)
], ApplicantController.prototype, "create", null);
__decorate([
    (0, common_1.Put)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dtos_1.UpdateApplicantDto]),
    __metadata("design:returntype", void 0)
], ApplicantController.prototype, "update", null);
__decorate([
    (0, common_1.Post)('upload'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ApplicantController.prototype, "upload", null);
__decorate([
    (0, common_1.Put)('approve/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ApplicantController.prototype, "toggleAproved", null);
__decorate([
    (0, common_1.Post)('accept/:id'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dtos_1.CreateOfficer, String]),
    __metadata("design:returntype", void 0)
], ApplicantController.prototype, "acept", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dtos_1.GetAplicantParamsDto]),
    __metadata("design:returntype", void 0)
], ApplicantController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('search/:term'),
    __param(0, (0, common_1.Param)('term')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dtos_1.GetAplicantParamsDto]),
    __metadata("design:returntype", void 0)
], ApplicantController.prototype, "search", null);
__decorate([
    (0, common_1.Get)('jobs/:term'),
    __param(0, (0, common_1.Param)('term')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ApplicantController.prototype, "searchJobs", null);
__decorate([
    (0, common_1.Get)('endorser/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ApplicantController.prototype, "searchByEndorser", null);
__decorate([
    (0, common_1.Get)('completed/:date'),
    __param(0, (0, common_1.Param)('date')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dtos_2.PaginationParamsDto]),
    __metadata("design:returntype", void 0)
], ApplicantController.prototype, "getCompleted", null);
__decorate([
    (0, common_1.Put)('officer/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dtos_1.UpdateOfficer]),
    __metadata("design:returntype", void 0)
], ApplicantController.prototype, "updateOfficers", null);
exports.ApplicantController = ApplicantController = __decorate([
    (0, common_1.Controller)('applicants'),
    __metadata("design:paramtypes", [services_1.ApplicantService])
], ApplicantController);
//# sourceMappingURL=applicant.controller.js.map