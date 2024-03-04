import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateApplicantDto } from '../dtos';
import { Applicant, Endorser, Organization } from '../schemas';
import { Officer } from '../schemas/officer.schema';
import { Job } from '../schemas/job.schema';

interface ExcelData {
  CI: number;
  NOMBRE: string;
  'APELLIDO PATERNO': string;
  'APELLIDO MATERNO': string;
  'PROF. ACADEMICA': string;
  'AVAL 1': string;
  'AVAL 2': string;
  'ORGANIZACIÓN SOCIAL': string;
}

export interface Planilla {
  __EMPTY: string;
  CARGO: string;
  'CI.': number;
  NOMBRE: string;
  'APELLIDO PATERNO': string;
  'APELLIDO MATERNO': string;
}

@Injectable()
export class ApplicantService {
  constructor(
    @InjectModel(Applicant.name) private endorsertModel: Model<Applicant>,
    @InjectModel(Endorser.name) private avalModel: Model<Endorser>,
    @InjectModel(Organization.name) private organizationModel: Model<Organization>,
    @InjectModel(Officer.name) private officerModel: Model<Officer>,
    @InjectModel(Job.name) private jobmodel: Model<Job>,
  ) {}

  async create(applicant: CreateApplicantDto) {
    const model = new this.endorsertModel(applicant);
    const createdApplicant = await model.save();
    return await createdApplicant.populate('endorsers');
  }

  async update(id: string, applicant: any) {
    return await this.endorsertModel.findByIdAndUpdate(id, applicant, { new: true }).populate('endorsers');
  }

  async findAll() {
    const applicants = await this.endorsertModel.find({}).populate('endorsers').sort({ _id: -1 });
    return { applicants };
  }

  async searchByEndorser(id_endorser: string) {
    return await this.endorsertModel.find({ endorsers: id_endorser });
  }

  async acept(id_applicant: string, data: any) {
    await this.endorsertModel.findByIdAndDelete(id_applicant);
    const createdOfficer = new this.officerModel(data);
    return await createdOfficer.save();
  }

  async searchAvailableJob(term: string) {
    const regex = new RegExp(term, 'i');
    return await this.jobmodel.aggregate([
      {
        $lookup: {
          from: 'funcionarios',
          localField: '_id',
          foreignField: 'cargo',
          as: 'funcionario',
        },
      },
      {
        $match: {
          funcionario: { $size: 0 },
          nombre: regex,
        },
      },
      { $limit: 5 },
      {
        $project: {
          funcionario: 0,
        },
      },
    ]);
  }

  async uploadData(data: ExcelData[]) {
    for (const element of data) {
      const newApplincat = new this.endorsertModel({
        firstname: element.NOMBRE,
        middlename: element['APELLIDO PATERNO'],
        lastname: element['APELLIDO MATERNO'],
        dni: element.CI,
        professional_profile: element['PROF. ACADEMICA'],
        candidate_for: '',
        endorsers: [],
      });
      if (element['AVAL 1'] && element['AVAL 1'] !== '') {
        const existAval = await this.avalModel.findOne({ name: element['AVAL 1'] });
        if (!existAval) {
          const newAval = new this.avalModel({ name: element['AVAL 1'] });
          if (element['ORGANIZACIÓN SOCIAL'] !== '' && element['ORGANIZACIÓN SOCIAL']) {
            const existOrg = await this.organizationModel.findOne({ name: element['ORGANIZACIÓN SOCIAL'] });
            if (!existOrg) {
              const newOrg = new this.organizationModel({ name: element['ORGANIZACIÓN SOCIAL'] });
              await newOrg.save();
              newAval.organization = newOrg._id;
            } else {
              newAval.organization = existOrg._id;
            }
          }
          await newAval.save();
          newApplincat.endorsers.push(newAval._id);
        } else {
          newApplincat.endorsers.push(existAval._id);
        }
      }
      await newApplincat.save();
    }
    return { ok: true };
  }

  async upload(data: Planilla[]) {
    for (const element of data) {
      const newApplincat = new this.officerModel({
        nombre: element.NOMBRE,
        paterno: element['APELLIDO PATERNO'],
        materno: element['APELLIDO MATERNO'],
        dni: element['CI.'],
      });
      if (element['AVAL 1'] && element['AVAL 1'] !== '') {
        const existAval = await this.avalModel.findOne({ name: element['AVAL 1'] });
        if (!existAval) {
          const newAval = new this.avalModel({ name: element['AVAL 1'] });
          if (element['ORGANIZACIÓN SOCIAL'] !== '' && element['ORGANIZACIÓN SOCIAL']) {
            const existOrg = await this.organizationModel.findOne({ name: element['ORGANIZACIÓN SOCIAL'] });
            if (!existOrg) {
              const newOrg = new this.organizationModel({ name: element['ORGANIZACIÓN SOCIAL'] });
              await newOrg.save();
              newAval.organization = newOrg._id;
            } else {
              newAval.organization = existOrg._id;
            }
          }
          await newAval.save();
          newApplincat.endorsers.push(newAval._id);
        } else {
          newApplincat.endorsers.push(existAval._id);
        }
      }
      await newApplincat.save();
    }
    return { ok: true };
  }
}
