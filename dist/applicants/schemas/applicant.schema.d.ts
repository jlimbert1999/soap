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
import mongoose, { Document } from 'mongoose';
import { Endorser } from './endorser.schema';
import { ApplicantStatus } from '../interfaces';
export declare class Applicant extends Document {
    firstname: string;
    middlename: string;
    lastname: string;
    dni: string;
    phone: string;
    professional_profile: string;
    date: Date;
    candidate_for: string;
    endorsers: Endorser[];
    status: ApplicantStatus;
    documents: string[];
}
export declare const ApplicantSchema: mongoose.Schema<Applicant, mongoose.Model<Applicant, any, any, any, mongoose.Document<unknown, any, Applicant> & Applicant & {
    _id: mongoose.Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Applicant, mongoose.Document<unknown, {}, mongoose.FlatRecord<Applicant>> & mongoose.FlatRecord<Applicant> & {
    _id: mongoose.Types.ObjectId;
}>;
