import { IsArray, IsIn, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApplicantDocuments } from '../interfaces';

export class CreateApplicantDto {
  @IsString()
  @IsNotEmpty()
  firstname: string;

  @IsString()
  @IsNotEmpty()
  middlename: string;

  @IsString()
  lastname: string;

  @IsString()
  dni: string;

  @IsString()
  phone: string;

  @IsString()
  professional_profile: string;

  @IsOptional()
  candidate_for: string;

  @IsString({ each: true })
  endorsers: string[];

  @IsOptional()
  @IsArray()
  @IsIn(Object.values(ApplicantDocuments), { each: true })
  documents: string[];
}
