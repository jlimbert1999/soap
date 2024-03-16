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
/// <reference types="mongoose/types/inferschematype" />
import mongoose, { Model } from 'mongoose';
import { Applicant, Endorser, Organization, Job, Officer } from '../schemas';
import { CreateApplicantDto, CreateOfficer, GetAplicantParamsDto, UpdateApplicantDto, UpdateOfficer } from '../dtos';
interface ExcelData {
    CI: number;
    NOMBRE: string;
    'APELLIDO PATERNO': string;
    'APELLIDO MATERNO': string;
    'PROF. ACADEMICA': string;
    'AVAL 1': string;
    'AVAL 2': string;
    'ORGANIZACIÓN SOCIAL': string;
}
export declare class ApplicantService {
    private applicantModel;
    private endorserModel;
    private organizationModel;
    private officerModel;
    private jobmodel;
    private connection;
    constructor(applicantModel: Model<Applicant>, endorserModel: Model<Endorser>, organizationModel: Model<Organization>, officerModel: Model<Officer>, jobmodel: Model<Job>, connection: mongoose.Connection);
    findAll({ limit, offset, date, status }: GetAplicantParamsDto): Promise<{
        applicants: Omit<mongoose.Document<unknown, {}, Applicant> & Applicant & {
            _id: mongoose.Types.ObjectId;
        }, never>[];
        length: number;
    }>;
    search(text: string, { limit, offset, date, status }: GetAplicantParamsDto): Promise<{
        applicants: any;
        length: any;
    }>;
    create(applicant: CreateApplicantDto): Promise<Omit<mongoose.Document<unknown, {}, Applicant> & Applicant & {
        _id: mongoose.Types.ObjectId;
    }, never>>;
    update(id: string, applicant: UpdateApplicantDto): Promise<mongoose.Document<unknown, {}, Applicant> & Applicant & {
        _id: mongoose.Types.ObjectId;
    }>;
    updateOfficer(id_applicant: string, data: UpdateOfficer): Promise<mongoose.Document<unknown, {}, Applicant> & Applicant & {
        _id: mongoose.Types.ObjectId;
    }>;
    searchByEndorser(id_endorser: string): Promise<(mongoose.Document<unknown, {}, Applicant> & Applicant & {
        _id: mongoose.Types.ObjectId;
    })[]>;
    accept(id_applicant: string, data: CreateOfficer): Promise<boolean>;
    searchAvailableJob(term: string): Promise<any[]>;
    getCompleted(limit: number, offset: number, date: number): Promise<{
        applicants: Omit<mongoose.Document<unknown, {}, Applicant> & Applicant & {
            _id: mongoose.Types.ObjectId;
        }, never>[];
        length: number;
    }>;
    toggleAproved(id_applicant: string): Promise<void>;
    uploadData(data: ExcelData[]): Promise<{
        ok: boolean;
    }>;
}
export {};
