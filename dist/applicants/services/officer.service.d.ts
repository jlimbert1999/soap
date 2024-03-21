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
import { Job, Level, Officer } from '../schemas';
import { Model } from 'mongoose';
import { PaginationParamsDto } from 'src/common/dtos';
export declare class OfficerService {
    private officerModel;
    private levelModel;
    private jobModel;
    constructor(officerModel: Model<Officer>, levelModel: Model<Level>, jobModel: Model<Job>);
    findAll({ limit, offset }: PaginationParamsDto): Promise<{
        officers: Omit<Omit<import("mongoose").Document<unknown, {}, Officer> & Officer & {
            _id: import("mongoose").Types.ObjectId;
        }, never>, never>[];
        length: number;
    }>;
    updateOfficer(id: string, data: {
        endorsers: string[];
    }): Promise<import("mongoose").Document<unknown, {}, Officer> & Officer & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    searchByEndorser(id_endorser: string): Promise<Omit<import("mongoose").Document<unknown, {}, Officer> & Officer & {
        _id: import("mongoose").Types.ObjectId;
    }, never>[]>;
    search(text: string, { limit, offset }: PaginationParamsDto): Promise<{
        officers: any;
        length: any;
    }>;
    upload(data: any[]): Promise<{
        ok: boolean;
    }>;
}
