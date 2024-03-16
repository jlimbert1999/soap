"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicantsModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const services_1 = require("./services");
const controllers_1 = require("./controllers");
const schemas_1 = require("./schemas");
let ApplicantsModule = class ApplicantsModule {
};
exports.ApplicantsModule = ApplicantsModule;
exports.ApplicantsModule = ApplicantsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: schemas_1.Organization.name, schema: schemas_1.OrganizationSchema },
                { name: schemas_1.Endorser.name, schema: schemas_1.EndorserSchema },
                { name: schemas_1.Applicant.name, schema: schemas_1.ApplicantSchema },
                { name: schemas_1.Officer.name, schema: schemas_1.OfficerSchema },
                { name: schemas_1.Job.name, schema: schemas_1.JobSchema },
                { name: schemas_1.Level.name, schema: schemas_1.LevelSchema },
            ]),
        ],
        controllers: [controllers_1.OrganizationController, controllers_1.EndorserController, controllers_1.ApplicantController, controllers_1.OfficerController],
        providers: [services_1.OrganizationService, services_1.EndorserService, services_1.ApplicantService, services_1.OfficerService],
    })
], ApplicantsModule);
//# sourceMappingURL=applicants.module.js.map