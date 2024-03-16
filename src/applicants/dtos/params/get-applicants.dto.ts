import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional } from 'class-validator';
import { PaginationParamsDto } from 'src/common/dtos';
import { ApplicantStatus } from 'src/applicants/interfaces';

export class GetAplicantParamsDto extends PaginationParamsDto {
  @IsInt()
  @IsOptional()
  @Type(() => Number)
  date?: number;

  @IsEnum(ApplicantStatus)
  status: ApplicantStatus;
}
