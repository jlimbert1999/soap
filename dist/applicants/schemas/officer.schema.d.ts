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
import { Job } from './job.schema';
import { Endorser } from './endorser.schema';
export declare class Officer extends Document {
    nombre: string;
    paterno: string;
    materno: string;
    dni: string;
    telefono: string;
    id_representantive: Endorser[];
    cargo: Job;
    fecha_nac: Date;
    fecha_ingreso: Date;
    fecha_salida: Date;
}
export declare const OfficerSchema: mongoose.Schema<Officer, mongoose.Model<Officer, any, any, any, mongoose.Document<unknown, any, Officer> & Officer & {
    _id: mongoose.Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Officer, mongoose.Document<unknown, {}, mongoose.FlatRecord<Officer>> & mongoose.FlatRecord<Officer> & {
    _id: mongoose.Types.ObjectId;
}>;
