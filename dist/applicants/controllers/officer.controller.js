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
exports.OfficerController = void 0;
const common_1 = require("@nestjs/common");
const services_1 = require("../services");
const dtos_1 = require("../../common/dtos");
let OfficerController = class OfficerController {
    constructor(officerService) {
        this.officerService = officerService;
    }
    findAll(params) {
        return this.officerService.findAll(params);
    }
    search(term, params) {
        return this.officerService.search(term, params);
    }
    update(id, data) {
        return this.officerService.updateOfficer(id, data);
    }
    upload(data) {
        return this.officerService.upload(data);
    }
    searchByEndorser(id) {
        return this.officerService.searchByEndorser(id);
    }
};
exports.OfficerController = OfficerController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dtos_1.PaginationParamsDto]),
    __metadata("design:returntype", void 0)
], OfficerController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('search/:term'),
    __param(0, (0, common_1.Param)('term')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dtos_1.PaginationParamsDto]),
    __metadata("design:returntype", void 0)
], OfficerController.prototype, "search", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], OfficerController.prototype, "update", null);
__decorate([
    (0, common_1.Post)('upload'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], OfficerController.prototype, "upload", null);
__decorate([
    (0, common_1.Get)('endorsers/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OfficerController.prototype, "searchByEndorser", null);
exports.OfficerController = OfficerController = __decorate([
    (0, common_1.Controller)('officers'),
    __metadata("design:paramtypes", [services_1.OfficerService])
], OfficerController);
//# sourceMappingURL=officer.controller.js.map