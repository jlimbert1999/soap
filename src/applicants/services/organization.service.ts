import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Organization } from '../schemas';
import { Model } from 'mongoose';
import { CreateOrganizationDto } from '../dtos';

@Injectable()
export class OrganizationService {
  constructor(@InjectModel(Organization.name) private organizationModel: Model<Organization>) {}

  async create(organization: CreateOrganizationDto) {
    const createOrganization = new this.organizationModel(organization);
    return await createOrganization.save();
  }

  async findAll() {
    const organizations = await this.organizationModel.find({}).sort({ _id: -1 });
    return { organizations };
  }
}
