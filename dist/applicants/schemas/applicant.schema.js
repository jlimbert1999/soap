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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicantSchema = exports.Applicant = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const endorser_schema_1 = require("./endorser.schema");
const interfaces_1 = require("../interfaces");
let Applicant = class Applicant extends mongoose_2.Document {
};
exports.Applicant = Applicant;
__decorate([
    (0, mongoose_1.Prop)({}),
    __metadata("design:type", String)
], Applicant.prototype, "firstname", void 0);
__decorate([
    (0, mongoose_1.Prop)({}),
    __metadata("design:type", String)
], Applicant.prototype, "middlename", void 0);
__decorate([
    (0, mongoose_1.Prop)({}),
    __metadata("design:type", String)
], Applicant.prototype, "lastname", void 0);
__decorate([
    (0, mongoose_1.Prop)({}),
    __metadata("design:type", String)
], Applicant.prototype, "dni", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], Applicant.prototype, "phone", void 0);
__decorate([
    (0, mongoose_1.Prop)({}),
    __metadata("design:type", String)
], Applicant.prototype, "professional_profile", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date }),
    __metadata("design:type", Date)
], Applicant.prototype, "date", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Applicant.prototype, "candidate_for", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [{ type: mongoose_2.default.Schema.Types.ObjectId, ref: endorser_schema_1.Endorser.name }] }),
    __metadata("design:type", Array)
], Applicant.prototype, "endorsers", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, enum: interfaces_1.ApplicantStatus, default: interfaces_1.ApplicantStatus.PENDING }),
    __metadata("design:type", String)
], Applicant.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [String], enum: interfaces_1.ApplicantDocuments, default: [] }),
    __metadata("design:type", Array)
], Applicant.prototype, "documents", void 0);
exports.Applicant = Applicant = __decorate([
    (0, mongoose_1.Schema)()
], Applicant);
exports.ApplicantSchema = mongoose_1.SchemaFactory.createForClass(Applicant);
//# sourceMappingURL=applicant.schema.js.map