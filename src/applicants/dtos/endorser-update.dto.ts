import { PartialType } from "@nestjs/mapped-types";
import { CreateEndorserDto } from "./endorser-create.dto";
export class UpdateEndorserDto extends PartialType(CreateEndorserDto) {}

