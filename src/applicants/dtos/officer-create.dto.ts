import { IsMongoId } from 'class-validator';

export class CreateOfficer {
  @IsMongoId()
  id_job: string;
}
