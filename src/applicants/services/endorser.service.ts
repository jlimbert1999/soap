import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Endorser } from '../schemas';
import { CreateEndorserDto } from '../dtos/endorser-create.dto';

@Injectable()
export class EndorserService {
  constructor(@InjectModel(Endorser.name) private endorsertModel: Model<Endorser>) {}

  async findAll() {
    const data = await this.endorsertModel.find({}).populate('organization').sort({ _id: -1 });
    return { endorsers: data };
  }

  async create(organization: CreateEndorserDto) {
    const createOrganization = new this.endorsertModel(organization);
    return (await createOrganization.save()).populate('organization');
  }

  async searchAvailable(term: string) {
    return await this.endorsertModel.find({ name: new RegExp(term, 'i') }).limit(10);
  }
}
