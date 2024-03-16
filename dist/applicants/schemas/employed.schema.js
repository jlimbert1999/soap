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
exports.EmployedSchema = exports.Employed = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const endorser_schema_1 = require("./endorser.schema");
const officer_schema_1 = require("./officer.schema");
const job_schema_1 = require("./job.schema");
let Employed = class Employed extends mongoose_2.Document {
};
exports.Employed = Employed;
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose_2.default.Schema.Types.ObjectId,
        ref: officer_schema_1.Officer.name,
    }),
    __metadata("design:type", officer_schema_1.Officer)
], Employed.prototype, "id_employee", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose_2.default.Schema.Types.ObjectId,
        ref: job_schema_1.Job.name,
    }),
    __metadata("design:type", job_schema_1.Job)
], Employed.prototype, "id_charge", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [{ type: mongoose_2.default.Schema.Types.ObjectId, ref: endorser_schema_1.Endorser.name }] }),
    __metadata("design:type", Array)
], Employed.prototype, "id_representantive", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date }),
    __metadata("design:type", Date)
], Employed.prototype, "date_time", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date }),
    __metadata("design:type", Date)
], Employed.prototype, "date_final", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date }),
    __metadata("design:type", Date)
], Employed.prototype, "createdAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Boolean, default: true }),
    __metadata("design:type", Boolean)
], Employed.prototype, "status", void 0);
exports.Employed = Employed = __decorate([
    (0, mongoose_1.Schema)({ collection: 'registeremployeeds' })
], Employed);
exports.EmployedSchema = mongoose_1.SchemaFactory.createForClass(Employed);
//# sourceMappingURL=employed.schema.js.map