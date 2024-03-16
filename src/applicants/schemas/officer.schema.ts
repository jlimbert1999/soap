import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Job } from './job.schema';
import { Endorser } from './endorser.schema';

@Schema({ collection: 'funcionarios' })
export class Officer extends Document {
  // @Prop({
  //   type: String,
  // })
  // name: string;

  // @Prop({
  //   type: String,
  // })
  // surname_pa: string;

  // @Prop({
  //   type: String,
  // })
  // surname_ma: string;

  // @Prop({
  //   type: Number,
  // })
  // ci: string;

  // @Prop({
  //   type: Date,
  // })
  // date_nac: Date;

  // @Prop({
  //   type: String,
  // })
  // title: string;

  // @Prop({
  //   type: String,
  // })
  // email: string;

  // @Prop({
  //   type: Number,
  // })
  // phone: string;

  // @Prop({
  //   type: String,
  // })
  // address: string;

  // @Prop({
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Users',
  //   default: '5e7b46399f3a2a02e49d16e9',
  // })
  // id_user: string;

  // @Prop({ type: Boolean, default: true })
  // status: boolean;

  // @Prop({ type: Date, default: Date.now })
  // createdAt: Date;

  @Prop({ type: String })
  nombre: string;

  @Prop({ type: String })
  paterno: string;

  @Prop({ type: String })
  materno: string;

  @Prop({ type: String })
  dni: string;

  @Prop({ type: String })
  telefono: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: Endorser.name }], default: [] })
  id_representantive: Endorser[];

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: Job.name,
  })
  cargo: Job;

  @Prop({ type: Date })
  fecha_nac: Date;

  @Prop({ type: Date })
  fecha_ingreso: Date;

  @Prop({ type: Date })
  fecha_salida: Date;
}

export const OfficerSchema = SchemaFactory.createForClass(Officer);
