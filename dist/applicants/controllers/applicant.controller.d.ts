/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { CreateApplicantDto, CreateOfficer, GetAplicantParamsDto, UpdateApplicantDto, UpdateOfficer } from '../dtos';
import { ApplicantService } from '../services';
import { PaginationParamsDto } from 'src/common/dtos';
export declare class ApplicantController {
    private applicantService;
    constructor(applicantService: ApplicantService);
    create(data: CreateApplicantDto): Promise<Omit<import("mongoose").Document<unknown, {}, import("../schemas").Applicant> & import("../schemas").Applicant & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
    update(id: string, data: UpdateApplicantDto): Promise<import("mongoose").Document<unknown, {}, import("../schemas").Applicant> & import("../schemas").Applicant & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    upload(data: any): Promise<{
        ok: boolean;
    }>;
    toggleAproved(id: string): Promise<void>;
    acept(data: CreateOfficer, id: string): Promise<boolean>;
    findAll(params: GetAplicantParamsDto): Promise<{
        applicants: Omit<import("mongoose").Document<unknown, {}, import("../schemas").Applicant> & import("../schemas").Applicant & {
            _id: import("mongoose").Types.ObjectId;
        }, never>[];
        length: number;
    }>;
    search(term: string, params: GetAplicantParamsDto): Promise<{
        applicants: any;
        length: any;
    }>;
    searchJobs(term: string): Promise<any[]>;
    searchByEndorser(id_endorser: string): Promise<(import("mongoose").Document<unknown, {}, import("../schemas").Applicant> & import("../schemas").Applicant & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    getCompleted(date: string, param: PaginationParamsDto): Promise<{
        applicants: Omit<import("mongoose").Document<unknown, {}, import("../schemas").Applicant> & import("../schemas").Applicant & {
            _id: import("mongoose").Types.ObjectId;
        }, never>[];
        length: number;
    }>;
    updateOfficers(id: string, body: UpdateOfficer): Promise<import("mongoose").Document<unknown, {}, import("../schemas").Applicant> & import("../schemas").Applicant & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
