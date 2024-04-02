import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Organization } from '../schemas';
import { Model } from 'mongoose';
import { CreateOrganizationDto, UpdateOrganizationDto } from '../dtos';
import { PaginationParamsDto } from 'src/common/dtos';

@Injectable()
export class OrganizationService {
  constructor(@InjectModel(Organization.name) private organizationModel: Model<Organization>) {}

  async create(organization: CreateOrganizationDto) {
    const createOrganization = new this.organizationModel(organization);
    return await createOrganization.save();
  }

  async update(id: string, organization: UpdateOrganizationDto) {
    return await this.organizationModel.findByIdAndUpdate(id, organization, { new: true });
  }

  async findAll({ limit, offset }: PaginationParamsDto) {
    const [organizations, length] = await Promise.all([
      this.organizationModel.find({}).skip(offset).limit(limit).sort({ _id: -1 }),
      this.organizationModel.countDocuments(),
    ]);
    return { organizations, length };
  }

  async search(term: string, { limit, offset }: PaginationParamsDto) {
    const [organizations, length] = await Promise.all([
      this.organizationModel
        .find({ name: RegExp(term, 'i') })
        .skip(offset)
        .limit(limit)
        .sort({ _id: -1 }),
      this.organizationModel.countDocuments({ name: RegExp(term, 'i') }),
    ]);
    return { organizations, length };
  }

  async searchAvailable(term: string) {
    return await this.organizationModel.find({ name: new RegExp(term, 'i') }).limit(5);
  }
}
