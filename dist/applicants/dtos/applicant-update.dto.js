"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateApplicantDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const applicant_create_dto_1 = require("./applicant-create.dto");
class UpdateApplicantDto extends (0, mapped_types_1.PartialType)(applicant_create_dto_1.CreateApplicantDto) {
}
exports.UpdateApplicantDto = UpdateApplicantDto;
//# sourceMappingURL=applicant-update.dto.js.map