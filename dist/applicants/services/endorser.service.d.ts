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
import { Model } from 'mongoose';
import { Applicant, Endorser, Officer } from '../schemas';
import { PaginationParamsDto } from 'src/common/dtos';
import { UpdateEndorserDto, CreateEndorserDto } from '../dtos';
export declare class EndorserService {
    private endorsertModel;
    private applicantModel;
    private officerModel;
    constructor(endorsertModel: Model<Endorser>, applicantModel: Model<Applicant>, officerModel: Model<Officer>);
    findAll({ limit, offset }: PaginationParamsDto): Promise<{
        endorsers: any;
        length: any;
    }>;
    search(term: string, { limit, offset }: PaginationParamsDto): Promise<{
        endorsers: any;
        length: any;
    }>;
    create(organization: CreateEndorserDto): Promise<Omit<import("mongoose").Document<unknown, {}, Endorser> & Endorser & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
    update(id: string, organization: UpdateEndorserDto): Promise<import("mongoose").Document<unknown, {}, Endorser> & Endorser & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    searchAvailable(term: string): Promise<any[]>;
}
