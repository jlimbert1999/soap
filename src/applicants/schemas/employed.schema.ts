import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Endorser } from './endorser.schema';
import { Officer } from './officer.schema';
import { Job } from './job.schema';

@Schema({ collection: 'registeremployeeds' })
export class Employed extends Document {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: Officer.name,
  })
  id_employee: Officer;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: Job.name,
  })
  id_charge: Job;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: Endorser.name }] })
  id_representantive: Endorser[];

  @Prop({ type: Date })
  date_time: Date;

  @Prop({ type: Date })
  date_final: Date;

  @Prop({ type: Date })
  createdAt: Date;

  @Prop({ type: Boolean })
  status: boolean;
}
export const EmployedSchema = SchemaFactory.createForClass(Employed);
