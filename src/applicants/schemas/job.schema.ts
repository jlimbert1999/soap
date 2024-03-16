import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Level } from './level.schema';

@Schema({ collection: 'cargos' })
export class Job extends Document {
  // @Prop({ type: String })
  // name: string;
  // @Prop({ type: Number })
  // register: number;
  // @Prop({ type: String, enum: ['ITEM', 'CONTRATO', 'EVENTUAL'] })
  // type: 'ITEM' | 'CONTRATO' | 'EVENTUAL';
  // @Prop({ type: String })
  // sigla: string;
  // @Prop({ type: String })
  // organization: string;
  // @Prop({
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Levels',
  // })
  // id_nivel: any;
  // @Prop({ type: String })
  // contract: string;
  // @Prop({
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Contracts',
  // })
  // id_contract: any;
  // @Prop({
  //   type: Boolean,
  //   default: true,
  // })
  // status: boolean;

  @Prop({ type: String })
  nombre: string;

  @Prop({ type: String, uppercase: true })
  codigo: string;

  @Prop({ type: String })
  denominacion: string;

  @Prop({ type: String })
  tipoContrato: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: Level.name,
  })
  nivel_id: Level;
}
export const JobSchema = SchemaFactory.createForClass(Job);
