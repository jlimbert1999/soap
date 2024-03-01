import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateApplicantDto } from '../dtos';
import { Applicant } from '../schemas';

@Injectable()
export class ApplicantService {
  constructor(@InjectModel(Applicant.name) private endorsertModel: Model<Applicant>) {}

  async create(applicant: CreateApplicantDto) {
    const model = new this.endorsertModel(applicant);
    const createdApplicant = await model.save();
    return await createdApplicant.populate('endorsers');
  }

  async findAll() {
    const applicants = await this.endorsertModel.find({}).populate('endorsers');
    return { applicants };
  }
}
