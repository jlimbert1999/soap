import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { CreateApplicantDto, CreateOfficer, UpdateOfficer } from '../dtos';
import { Applicant, Endorser, Organization } from '../schemas';
import { Officer } from '../schemas/officer.schema';
import { Job } from '../schemas/job.schema';
import { Employed } from '../schemas/employed.schema';
import { PaginationParamsDto } from 'src/common/dtos';
import { ApplicantStatus } from '../interfaces';

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

@Injectable()
export class ApplicantService {
  constructor(
    @InjectModel(Applicant.name) private endorsertModel: Model<Applicant>,
    @InjectModel(Endorser.name) private avalModel: Model<Endorser>,
    @InjectModel(Organization.name) private organizationModel: Model<Organization>,
    @InjectModel(Officer.name) private officerModel: Model<Officer>,
    @InjectModel(Job.name) private jobmodel: Model<Job>,
    @InjectModel(Employed.name) private employedModel: Model<Employed>,
    @InjectConnection() private connection: mongoose.Connection,
  ) {}

  async findAll({ limit, offset }: PaginationParamsDto) {
    const [applicants, length] = await Promise.all([
      this.endorsertModel
        .find({ status: ApplicantStatus.PENDING })
        .populate('endorsers')
        .sort({ _id: -1 })
        .limit(limit)
        .skip(offset),
      this.endorsertModel.countDocuments({}),
    ]);
    return { applicants, length };
  }

  async getApproved({ limit, offset }: PaginationParamsDto) {
    const [applicants, length] = await Promise.all([
      this.endorsertModel
        .find({ status: ApplicantStatus.ACCEPTED })
        .populate('endorsers')
        .sort({ _id: -1 })
        .limit(limit)
        .skip(offset),
      this.endorsertModel.countDocuments({ status: ApplicantStatus.ACCEPTED }),
    ]);
    return { applicants, length };
  }

  async search(text: string, { limit, offset }: PaginationParamsDto) {
    const term = new RegExp(text, 'i');
    const query: mongoose.FilterQuery<Applicant> = {
      $or: [{ firstname: term }, { middlename: term }, { lastname: term }, { dni: term }],
    };
    const [applicants, length] = await Promise.all([
      this.endorsertModel.find(query).populate('endorsers').sort({ _id: -1 }).limit(limit).skip(offset),
      this.endorsertModel.countDocuments(query),
    ]);
    return { applicants, length };
  }

  async create(applicant: CreateApplicantDto) {
    const model = new this.endorsertModel(applicant);
    const createdApplicant = await model.save();
    return await createdApplicant.populate('endorsers');
  }

  async update(id: string, applicant: any) {
    return await this.endorsertModel.findByIdAndUpdate(id, applicant, { new: true }).populate('endorsers');
  }

  async updateOfficer(id_applicant: string, data: UpdateOfficer) {
    return await this.endorsertModel
      .findByIdAndUpdate(id_applicant, { documents: data.documents }, { new: true })
      .populate('endorsers');
  }

  async searchByEndorser(id_endorser: string) {
    return await this.endorsertModel.find({ endorsers: id_endorser });
  }

  async approve(id: string) {
    await this.endorsertModel.updateOne({ _id: id }, { status: ApplicantStatus.ACCEPTED });
    return { message: 'Postulante aprobado' };
  }

  async acept(id_applicant: string, applicant: CreateOfficer) {
    const session = await this.connection.startSession();
    try {
      session.startTransaction();
      const applicantDB = await this.endorsertModel.findByIdAndDelete(id_applicant, { session });
      const officer = new this.officerModel({
        name: applicantDB.firstname,
        surname_pa: applicantDB.middlename,
        surname_ma: applicantDB.lastname,
        ci: applicantDB.dni,
        title: applicantDB.professional_profile,
      });
      const { _id } = await officer.save({ session });
      const employed = new this.employedModel({
        id_employee: _id,
        id_charge: applicant.id_job,
        id_representantive: applicantDB.endorsers.map((el) => el._id),
        date_time: new Date(),
      });
      await employed.save({ session });
      await session.commitTransaction();
      return;
    } catch (error) {
      await session.abortTransaction();
      throw new InternalServerErrorException('Error al registrar el tramite externo');
    } finally {
      session.endSession();
    }
  }

  async searchAvailableJob(term: string) {
    const regex = new RegExp(term, 'i');
    return await this.jobmodel.aggregate([
      {
        $match: {
          name: regex,
        },
      },
      {
        $lookup: {
          from: 'registeremployeeds',
          localField: '_id',
          foreignField: 'id_charge',
          as: 'funcionario',
        },
      },
      {
        $match: {
          funcionario: { $size: 0 },
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
      if (element['AVAL 1'] && element['AVAL 1'] != '') {
        const existAval = await this.avalModel.findOne({ name: element['AVAL 1'].toUpperCase() });
        if (!existAval) {
          const newAval = new this.avalModel({ name: element['AVAL 1'] });
          if (element['ORGANIZACIÓN SOCIAL'] !== '' && element['ORGANIZACIÓN SOCIAL']) {
            const existOrg = await this.organizationModel.findOne({
              name: element['ORGANIZACIÓN SOCIAL'].toUpperCase(),
            });
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
    console.log('do');
    return { ok: true };
  }
}
