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
exports.EndorserController = void 0;
const common_1 = require("@nestjs/common");
const services_1 = require("../services");
const dtos_1 = require("../../common/dtos");
const dtos_2 = require("../dtos");
let EndorserController = class EndorserController {
    constructor(endorserService) {
        this.endorserService = endorserService;
    }
    findAll(params) {
        return this.endorserService.findAll(params);
    }
    search(term, params) {
        return this.endorserService.search(term, params);
    }
    create(organization) {
        return this.endorserService.create(organization);
    }
    update(id, organization) {
        return this.endorserService.update(id, organization);
    }
    searchAvailable(term) {
        return this.endorserService.searchAvailable(term);
    }
};
exports.EndorserController = EndorserController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dtos_1.PaginationParamsDto]),
    __metadata("design:returntype", void 0)
], EndorserController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('search/:term'),
    __param(0, (0, common_1.Param)('term')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dtos_1.PaginationParamsDto]),
    __metadata("design:returntype", void 0)
], EndorserController.prototype, "search", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dtos_2.CreateEndorserDto]),
    __metadata("design:returntype", void 0)
], EndorserController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dtos_2.UpdateEndorserDto]),
    __metadata("design:returntype", void 0)
], EndorserController.prototype, "update", null);
__decorate([
    (0, common_1.Get)('available/:term'),
    __param(0, (0, common_1.Param)('term')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], EndorserController.prototype, "searchAvailable", null);
exports.EndorserController = EndorserController = __decorate([
    (0, common_1.Controller)('endorsers'),
    __metadata("design:paramtypes", [services_1.EndorserService])
], EndorserController);
//# sourceMappingURL=endorser.controller.js.map