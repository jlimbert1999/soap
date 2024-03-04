import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Job } from './job.schema';
import { Endorser } from './endorser.schema';

@Schema({ collection: 'funcionarios' })
export class Officer extends Document {
  @Prop({
    type: String,
    required: true,
    uppercase: true,
  })
  nombre: string;

  @Prop({
    type: String,
    uppercase: true,
  })
  paterno: string;

  @Prop({
    type: String,
    uppercase: true,
  })
  materno: string;

  @Prop({
    type: Number,
  })
  telefono: number;

  @Prop({
    type: Number,
  })
  dni: number;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'cargos',
  })
  cargo?: Job;

  @Prop({
    type: Boolean,
    default: true,
  })
  activo: boolean;

  @Prop({
    type: String,
  })
  imgUrl?: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: Endorser.name }] })
  endorsers: string[];
}

export const OfficerSchema = SchemaFactory.createForClass(Officer);
