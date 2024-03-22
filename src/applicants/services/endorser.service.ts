import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Applicant, Endorser, Officer } from '../schemas';
import { CreateEndorserDto } from '../dtos/endorser-create.dto';
import { PaginationParamsDto } from 'src/common/dtos';

@Injectable()
export class EndorserService {
  constructor(
    @InjectModel(Endorser.name) private endorsertModel: Model<Endorser>,
    @InjectModel(Applicant.name) private applicantModel: Model<Applicant>,
    @InjectModel(Officer.name) private officerModel: Model<Officer>,
  ) {}

  async findAll({ limit, offset }: PaginationParamsDto) {
    const data = await this.endorsertModel.aggregate().facet({
      results: [
        { $skip: offset },
        { $limit: limit },
        {
          $lookup: {
            from: 'funcionarios',
            localField: '_id',
            foreignField: 'id_representantive',
            as: 'officers',
          },
        },
        {
          $lookup: {
            from: 'applicants',
            localField: '_id',
            foreignField: 'endorsers',
            as: 'applicants',
          },
        },
        {
          $project: {
            _id: 1,
            name: 1,
            organization: 1,
            officers: { $size: '$officers' },
            applicants: { $size: '$applicants' },
          },
        },
        {
          $lookup: {
            from: 'organizations',
            localField: 'organization',
            foreignField: '_id',
            as: 'organization',
          },
        },
        {
          $unwind: {
            path: '$organization',
            preserveNullAndEmptyArrays: true,
          },
        },
      ],
      length: [{ $count: 'total' }],
    });
    const endorsers = data[0].results;
    const length = data[0].length[0] ? data[0].length[0].total : 0;
    return { endorsers, length };
  }

  async search(term: string, { limit, offset }: PaginationParamsDto) {
    const regex = RegExp(term, 'i');
    const data = await this.endorsertModel
      .aggregate()
      .lookup({
        from: 'organizations',
        localField: 'organization',
        foreignField: '_id',
        as: 'organization',
      })
      .unwind({
        path: '$organization',
        preserveNullAndEmptyArrays: true,
      })
      .match({ $or: [{ name: regex }, { 'organization.name': regex }] })
      .facet({
        results: [
          { $skip: offset },
          { $limit: limit },
          {
            $lookup: {
              from: 'funcionarios',
              localField: '_id',
              foreignField: 'id_representantive',
              as: 'officers',
            },
          },
          {
            $lookup: {
              from: 'applicants',
              localField: '_id',
              foreignField: 'endorsers',
              as: 'applicants',
            },
          },
          {
            $project: {
              _id: 1,
              name: 1,
              organization: 1,
              officers: { $size: '$officers' },
              applicants: { $size: '$applicants' },
            },
          },
        ],
        length: [{ $count: 'total' }],
      });
    const endorsers = data[0].results;
    const length = data[0].length[0] ? data[0].length[0].total : 0;
    return { endorsers, length };
  }

  async create(organization: CreateEndorserDto) {
    const createOrganization = new this.endorsertModel(organization);
    return (await createOrganization.save()).populate('organization');
  }

  async searchAvailable(term: string) {
    return await this.endorsertModel.find({ name: new RegExp(term, 'i') }).limit(5);
  }
}
