import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class CreateOfficer {
  @IsMongoId()
  id_job: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  dni: string;
}
