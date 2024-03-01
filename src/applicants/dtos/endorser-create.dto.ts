import { IsString, IsNotEmpty, IsMongoId } from 'class-validator';

export class CreateEndorserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsMongoId()
  organization: string;
}
