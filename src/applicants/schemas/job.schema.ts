import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema({ collection: 'charges' })
export class Job extends Document {
  @Prop({ type: String })
  name: string;

  @Prop({ type: Number })
  register: number;

  @Prop({ type: String, enum: ['ITEM', 'CONTRATO', 'EVENTUAL'] })
  type: 'ITEM' | 'CONTRATO' | 'EVENTUAL';

  @Prop({ type: String })
  sigla: string;

  @Prop({ type: String })
  organization: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Levels',
  })
  id_nivel: any;

  @Prop({ type: String })
  contract: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Contracts',
  })
  id_contract: any;

  @Prop({
    type: Boolean,
    default: true,
  })
  status: boolean;
}
export const JobSchema = SchemaFactory.createForClass(Job);
