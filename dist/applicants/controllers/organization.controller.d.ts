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
import { OrganizationService } from '../services';
import { CreateOrganizationDto, UpdateOrganizationDto } from '../dtos';
import { PaginationParamsDto } from 'src/common/dtos';
export declare class OrganizationController {
    private organizationService;
    constructor(organizationService: OrganizationService);
    create(organization: CreateOrganizationDto): Promise<import("mongoose").Document<unknown, {}, import("../schemas").Organization> & import("../schemas").Organization & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    findAll(params: PaginationParamsDto): Promise<{
        organizations: (import("mongoose").Document<unknown, {}, import("../schemas").Organization> & import("../schemas").Organization & {
            _id: import("mongoose").Types.ObjectId;
        })[];
        length: number;
    }>;
    search(term: string, params: PaginationParamsDto): Promise<{
        organizations: (import("mongoose").Document<unknown, {}, import("../schemas").Organization> & import("../schemas").Organization & {
            _id: import("mongoose").Types.ObjectId;
        })[];
        length: number;
    }>;
    update(id: string, organization: UpdateOrganizationDto): Promise<import("mongoose").Document<unknown, {}, import("../schemas").Organization> & import("../schemas").Organization & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    searchAvailable(term: string): Promise<(import("mongoose").Document<unknown, {}, import("../schemas").Organization> & import("../schemas").Organization & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
}
