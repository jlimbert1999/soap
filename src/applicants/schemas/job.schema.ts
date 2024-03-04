import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema({ collection: 'cargos' })
export class Job extends Document {
  @Prop({
    type: String,
    required: true,
    uppercase: true,
  })
  nombre: string;

  @Prop({
    type: String,
  })
  denominacion: string;

  @Prop({
    type: String,
  })
  tipoContrato: string;

  @Prop({
    type: Number,
  })
  duracion_contrato: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'niveles', default: null })
  nivel_id: string;

  @Prop({
    type: String,
  })
  estado: string;

  @Prop({
    type: String,
  })
  secretaria: string;
  @Prop({
    type: String,
  })
  jefatura: string;

  @Prop({
    type: String,
  })
  direccion: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'cargos', default: null })
  superior?: Job;

  @Prop({ type: Boolean, default: false })
  isRoot: boolean;
}
export const JobSchema = SchemaFactory.createForClass(Job);
