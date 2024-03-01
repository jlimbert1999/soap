import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Endorser } from './endorser.schema';

@Schema()
export class Applicant extends Document {
  @Prop({ required: true })
  firstname: string;

  @Prop({ required: true })
  middlename: string;

  @Prop({ required: true })
  lastname: string;

  @Prop({ required: true, unique: true })
  dni: string;

  @Prop({ required: true })
  professional_profile: string;

  @Prop()
  candidate_for: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: Endorser.name }] })
  endorsers: string[];
}
export const ApplicantSchema = SchemaFactory.createForClass(Applicant);
