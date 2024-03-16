import { PaginationParamsDto } from 'src/common/dtos';
import { ApplicantStatus } from 'src/applicants/interfaces';
export declare class GetAplicantParamsDto extends PaginationParamsDto {
    date?: number;
    status: ApplicantStatus;
}
