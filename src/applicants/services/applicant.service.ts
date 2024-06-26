import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import mongoose, { FilterQuery, Model } from 'mongoose';
import { Applicant, Endorser, Organization, Job, Officer } from '../schemas';
import { CreateApplicantDto, CreateOfficer, GetAplicantParamsDto, UpdateApplicantDto, UpdateOfficer } from '../dtos';
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
    @InjectModel(Applicant.name) private applicantModel: Model<Applicant>,
    @InjectModel(Endorser.name) private endorserModel: Model<Endorser>,
    @InjectModel(Organization.name) private organizationModel: Model<Organization>,

    @InjectModel(Officer.name) private officerModel: Model<Officer>,
    @InjectModel(Job.name) private jobmodel: Model<Job>,
    @InjectConnection() private connection: mongoose.Connection,
  ) {}

  async findAll({ limit, offset, date, status }: GetAplicantParamsDto) {
    const query: FilterQuery<Applicant> = {
      status: status,
      ...(date && {
        date: {
          $gte: new Date(date),
          $lt: new Date(date + 24 * 60 * 60 * 1000),
        },
      }),
    };
    const [applicants, length] = await Promise.all([
      this.applicantModel.find(query).populate('endorsers').sort({ _id: -1 }).limit(limit).skip(offset),
      this.applicantModel.countDocuments(query),
    ]);
    return { applicants, length };
  }

  async search(text: string, { limit, offset, date, status }: GetAplicantParamsDto) {
    const term = new RegExp(text, 'i');
    const query: FilterQuery<Applicant> = {
      status: status,
      ...(date && {
        date: {
          $gte: new Date(date),
          $lt: new Date(date + 24 * 60 * 60 * 1000),
        },
      }),
    };
    const data = await this.applicantModel
      .aggregate()
      .match(query)
      .addFields({
        fullname: {
          $concat: ['$firstname', ' ', '$middlename', ' ', '$lastname'],
        },
      })
      .match({ $or: [{ fullname: term }, { dni: term }] })
      .project({ fullname: 0 })
      .facet({
        paginatedResults: [{ $skip: offset }, { $limit: limit }],
        totalCount: [{ $count: 'count' }],
      });
    const applicants = data[0].paginatedResults;
    await this.applicantModel.populate(applicants, 'endorsers');
    const length = data[0].totalCount[0] ? data[0].totalCount[0].count : 0;
    return { applicants, length };
  }

  async create(applicant: CreateApplicantDto) {
    const applicantDB = await this.applicantModel.findOne({ dni: applicant.dni });
    if (applicantDB) throw new BadRequestException(`El CI: ${applicant.dni} ya existe`);
    const model = new this.applicantModel(applicant);
    const createdApplicant = await model.save();
    return await createdApplicant.populate('endorsers');
  }

  async update(id: string, applicant: UpdateApplicantDto) {
    const applicantDB = await this.applicantModel.findById(id);
    if (!applicantDB) throw new BadRequestException('El postulante no existe');
    if (applicant.dni !== applicantDB.dni) {
      const duplicate = await this.applicantModel.findOne({ dni: applicant.dni });
      if (duplicate) throw new BadRequestException(`El CI: ${applicant.dni} ya existe`);
    }
    return await this.applicantModel.findByIdAndUpdate(id, applicant, { new: true }).populate('endorsers');
  }

  async updateOfficer(id_applicant: string, data: UpdateOfficer) {
    return await this.applicantModel
      .findByIdAndUpdate(id_applicant, { documents: data.documents }, { new: true })
      .populate('endorsers');
  }

  async searchByEndorser(id_endorser: string) {
    return await this.applicantModel.find({ endorsers: id_endorser });
  }

  async accept(id_applicant: string, data: CreateOfficer) {
    const duplicate = await this.officerModel.findOne({ dni: data.dni });
    if (duplicate) {
      const fullname = `${duplicate.nombre} ${duplicate.paterno} ${duplicate.materno}`;
      throw new BadRequestException(`El funcionario ${fullname} ya tiene el CI: ${duplicate.dni}`.toUpperCase());
    }
    const session = await this.connection.startSession();
    try {
      session.startTransaction();
      const applicantDB = await this.applicantModel.findByIdAndUpdate(
        id_applicant,
        { candidate_for: data.name, status: ApplicantStatus.COMPLETED, date: new Date() },
        { session },
      );
      const officer = new this.officerModel({
        nombre: applicantDB.firstname,
        paterno: applicantDB.middlename,
        materno: applicantDB.lastname,
        dni: applicantDB.dni,
        telefono: applicantDB.phone,
        cargo: data.id_job,
        oldcargo: data.id_job,
        id_representantive: applicantDB.endorsers.map((el) => el._id),
      });
      await officer.save({ session });
      await session.commitTransaction();
      return true;
    } catch (error) {
      await session.abortTransaction();
      throw new InternalServerErrorException('Error al crear funcionario');
    } finally {
      session.endSession();
    }
  }

  async searchAvailableJob(term: string) {
    const regex = new RegExp(term, 'i');
    return await this.jobmodel.aggregate([
      { $match: { nombre: regex } },
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

  async getCompleted(limit: number, offset: number, date: number) {
    const inDate = new Date(date);
    const query: FilterQuery<Applicant> = {
      status: ApplicantStatus.COMPLETED,
      date: {
        $gte: new Date(inDate.getFullYear(), inDate.getMonth(), inDate.getDate()),
        $lt: new Date(inDate.getFullYear(), inDate.getMonth(), inDate.getDate() + 1),
      },
    };
    const [applicants, length] = await Promise.all([
      this.applicantModel.find(query).populate('endorsers').sort({ _id: -1 }).limit(limit).skip(offset),
      this.applicantModel.countDocuments(query),
    ]);
    return { applicants, length };
  }

  async toggleAproved(id_applicant: string) {
    const applicantDB = await this.applicantModel.findById(id_applicant);
    if (!applicantDB) throw new BadRequestException(`applicant ${id_applicant} dont exist`);
    if (applicantDB.status === ApplicantStatus.ACCEPTED) {
      await this.applicantModel.updateOne({ _id: id_applicant }, { documents: [], status: ApplicantStatus.PENDING });
    } else {
      await this.applicantModel.updateOne(
        { _id: id_applicant },
        { status: ApplicantStatus.ACCEPTED, date: new Date() },
      );
    }
  }

  // async uploadData(data: ExcelData[]) {
  //   for (const element of data) {
  //     const newApplincat = new this.applicantModel({
  //       firstname: element.NOMBRE,
  //       middlename: element['APELLIDO PATERNO'],
  //       lastname: element['APELLIDO MATERNO'],
  //       dni: element.CI,
  //       professional_profile: element['PROF. ACADEMICA'],
  //       candidate_for: '',
  //       endorsers: [],
  //     });
  //     if (element['AVAL 1'] && element['AVAL 1'] != '') {
  //       const existAval = await this.endorserModel.findOne({ name: element['AVAL 1'].toUpperCase() });
  //       if (!existAval) {
  //         const newAval = new this.endorserModel({ name: element['AVAL 1'] });
  //         if (element['ORGANIZACIÓN SOCIAL'] !== '' && element['ORGANIZACIÓN SOCIAL']) {
  //           const existOrg = await this.organizationModel.findOne({
  //             name: element['ORGANIZACIÓN SOCIAL'].toUpperCase(),
  //           });
  //           if (!existOrg) {
  //             const newOrg = new this.organizationModel({ name: element['ORGANIZACIÓN SOCIAL'] });
  //             await newOrg.save();
  //             newAval.organization = newOrg._id;
  //           } else {
  //             newAval.organization = existOrg._id;
  //           }
  //         }
  //         await newAval.save();
  //         newApplincat.endorsers.push(newAval._id);
  //       } else {
  //         newApplincat.endorsers.push(existAval._id);
  //       }
  //     }
  //     await newApplincat.save();
  //   }
  //   console.log(data);
  //   return { ok: true };
  // }

  async uploadData(data: ExcelData[]) {
    // for (const element of data) {
    //   if (element['AVAL 1'] && element['AVAL 1'] != '') {
    //     const existAval = await this.endorserModel.findOne({ name: element['AVAL 1'].toUpperCase() });
    //     if (!existAval) {
    //       const newAval = new this.endorserModel({ name: element['AVAL 1'] });
    //       if (element['ORGANIZACIÓN SOCIAL'] !== '' && element['ORGANIZACIÓN SOCIAL']) {
    //         const existOrg = await this.organizationModel.findOne({
    //           name: element['ORGANIZACIÓN SOCIAL'].toUpperCase(),
    //         });
    //         if (!existOrg) {
    //           const newOrg = new this.organizationModel({ name: element['ORGANIZACIÓN SOCIAL'] });
    //           await newOrg.save();
    //           newAval.organization = newOrg._id;
    //         } else {
    //           newAval.organization = existOrg._id;
    //         }
    //       }
    //       await newAval.save();
    //     }
    //   }
    // }
    console.log(data);
    return { ok: true };
  }
}
