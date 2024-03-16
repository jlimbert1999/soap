import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Job, Level, Officer } from '../schemas';
import { Model } from 'mongoose';
import { PaginationParamsDto } from 'src/common/dtos';

// interface Planilla {
//   'Nª ITEM': number;
//   Cargo: string;
//   Contrato: string;
//   'CI.': number;
//   'NOMBRE COMPLETO': string;
//   'FECHA DE NACIMIENTO': string;
//   'FECHA DE INCRESO': string;
//   'FECHA DE CONCLUSION': string;
//   Nivel: number;
// }

// interface Niveles {
//   'NIVEL SALARIAL': number;
//   'DENOMINACION DEL PUESTO': string;
//   'SUELDO O HABER MENSUAL': number;
// }

@Injectable()
export class OfficerService {
  constructor(
    @InjectModel(Officer.name) private officerModel: Model<Officer>,
    @InjectModel(Level.name) private levelModel: Model<Level>,
    @InjectModel(Job.name) private jobModel: Model<Job>,
  ) {}

  async findAll({ limit, offset }: PaginationParamsDto) {
    const [officers, length] = await Promise.all([
      this.officerModel
        .find({})
        .populate('id_representantive')
        .populate({ path: 'cargo', populate: { path: 'nivel_id' } })
        .sort({ _id: -1 })
        .limit(limit)
        .skip(offset),
      this.officerModel.countDocuments({}),
    ]);
    return { officers, length };
  }

  async updateOfficer(id: string, data: { endorsers: string[] }) {
    return await this.officerModel
      .findByIdAndUpdate(id, { id_representantive: data.endorsers }, { new: true })
      .populate('id_representantive')
      .populate({ path: 'cargo', populate: { path: 'nivel_id' } });
  }

  async search(text: string, { limit, offset }: PaginationParamsDto) {
    const term = new RegExp(text, 'i');
    const data = await this.officerModel
      .aggregate()
      .addFields({
        fullname: {
          $concat: ['$nombre', ' ', '$paterno', ' ', '$materno'],
        },
      })
      .match({ $or: [{ fullname: term }, { dni: term }] })
      .project({ fullname: 0 })
      .facet({
        paginatedResults: [{ $skip: offset }, { $limit: limit }],
        totalCount: [{ $count: 'count' }],
      });
    const officers = data[0].paginatedResults;
    await this.officerModel.populate(officers, [
      { path: 'id_representantive' },
      { path: 'cargo', populate: { path: 'nivel_id' } },
    ]);
    const length = data[0].totalCount[0] ? data[0].totalCount[0].count : 0;
    return { officers, length };
  }

  async upload() {
    // for (const element of data) {
    //   const level = await this.levelModel.findOne({ nivel: element.Nivel });
    //   if (!level) throw new BadGatewayException('Nivel desconocido');
    //   const job = new this.jobModel({
    //     nombre: element.Cargo,
    //     tipoContrato: element.Contrato,
    //     codigo: element['Nª ITEM'],
    //     nivel_id: level._id,
    //   });
    //   const createdJob = await job.save();

    //   if (element['NOMBRE COMPLETO']) {
    //     const fullname = element['NOMBRE COMPLETO'].split(' ');
    //     let parts = { nombre: '', paterno: '', materno: '' };
    //     switch (fullname.length) {
    //       case 2:
    //         parts = { nombre: fullname[0], paterno: fullname[1], materno: '' };
    //         break;
    //       case 4:
    //         parts = { nombre: `${fullname[0]} ${fullname[1]}`, paterno: fullname[2], materno: fullname[3] };
    //         break;
    //       default:
    //         parts = { nombre: `${fullname[0]}`, paterno: fullname[1], materno: fullname[2] };
    //         break;
    //     }
    //     console.log(parts);
    //     const officer = new this.officerModel({
    //       nombre: parts.nombre,
    //       paterno: parts.paterno,
    //       materno: parts.materno,
    //       cargo: createdJob._id,
    //       dni: element['CI.'],
    //       ...(!isNaN(new Date(element['FECHA DE INCRESO']).getTime()) && {
    //         fecha_ingreso: new Date(element['FECHA DE INCRESO']),
    //       }),
    //       ...(!isNaN(new Date(element['FECHA DE NACIMIENTO']).getTime()) && {
    //         fecha_nac: new Date(element['FECHA DE NACIMIENTO']),
    //       }),
    //     });
    //     await officer.save();
    //   }
    // }

    // for (const element of data) {
    //   const level = await this.levelModel.findOne({ nivel: element.Nivel });
    //   if (!level) throw new BadGatewayException('Nivel desconocido');
    //   const job = new this.jobModel({
    //     nombre: element.Cargo,
    //     tipoContrato: element.Contrato,
    //     codigo: element['Nª ITEM'],
    //     nivel_id: level._id,
    //   });
    //   await job.save();
    // }

    // for (const element of data) {
    //   if (element['NOMBRE COMPLETO']) {
    //     const fullname = element['NOMBRE COMPLETO'].split(' ');
    //     let parts = { nombre: '', paterno: '', materno: '' };
    //     switch (fullname.length) {
    //       case 2:
    //         parts = { nombre: fullname[1], paterno: fullname[0], materno: '' };
    //         break;
    //       case 4:
    //         parts = { nombre: `${fullname[3]} ${fullname[2]}`, paterno: fullname[0], materno: fullname[1] };
    //         break;
    //       case 5:
    //         parts = { nombre: `${fullname[4]} ${fullname[3]} ${fullname[2]}`, paterno: fullname[0], materno: fullname[1] };
    //         break;
    //       default:
    //         parts = { nombre: `${fullname[2]}`, paterno: fullname[0], materno: fullname[1] };
    //         break;
    //     }
    //     console.log(parts);
    //     const officer = new this.officerModel({
    //       nombre: parts.nombre,
    //       paterno: parts.paterno,
    //       materno: parts.materno,
    //       dni: element['CI.'],
    //       ...(!isNaN(new Date(element['FECHA DE INCRESO']).getTime()) && {
    //         fecha_ingreso: new Date(element['FECHA DE INCRESO']),
    //       }),
    //       ...(!isNaN(new Date(element['FECHA DE NACIMIENTO']).getTime()) && {
    //         fecha_nac: new Date(element['FECHA DE NACIMIENTO']),
    //       }),
    //       ...(!isNaN(new Date(element['FECHA DE CONCLUSION']).getTime()) && {
    //         fecha_salida: new Date(element['FECHA DE CONCLUSION']),
    //       }),
    //     });
    //     await officer.save();
    //   }
    // }

    return { ok: true };
  }

  // ! LEVELS
  // async upload(data: Niveles[]) {
  //   for (const element of data) {
  //     const level = new this.levelModel({
  //       nivel: element['NIVEL SALARIAL'],
  //       sueldo: element['SUELDO O HABER MENSUAL'],
  //     });
  //     await level.save();
  //   }
  //   return { ok: true };
  // }
}
