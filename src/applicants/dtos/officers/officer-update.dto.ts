import { IsArray, IsIn } from 'class-validator';
import { ApplicantDocuments } from 'src/applicants/interfaces';

export class UpdateOfficer {
  @IsArray()
  @IsIn(Object.values(ApplicantDocuments), { each: true })
  documents: string[];
}
  