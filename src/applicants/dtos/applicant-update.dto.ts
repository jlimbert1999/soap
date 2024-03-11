import { PartialType } from '@nestjs/mapped-types';
import { CreateApplicantDto } from './applicant-create.dto';

export class UpdateApplicantDto extends PartialType(CreateApplicantDto) {}
