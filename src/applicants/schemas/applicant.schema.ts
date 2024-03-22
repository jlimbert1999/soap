import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Endorser } from './endorser.schema';
import { ApplicantDocuments, ApplicantStatus } from '../interfaces';

@Schema()
export class Applicant extends Document {
  @Prop({ type: String, uppercase: true })
  firstname: string;

  @Prop({ type: String, uppercase: true })
  middlename: string;

  @Prop({ type: String, uppercase: true })
  lastname: string;

  @Prop({})
  dni: string;

  @Prop({ type: String })
  phone: string;

  @Prop({})
  professional_profile: string;

  @Prop({ type: Date })
  date: Date;

  @Prop()
  candidate_for: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: Endorser.name }] })
  endorsers: Endorser[];

  @Prop({ type: String, enum: ApplicantStatus, default: ApplicantStatus.PENDING })
  status: ApplicantStatus;

  @Prop({ type: [String], enum: ApplicantDocuments, default: [] })
  documents: string[];
}
export const ApplicantSchema = SchemaFactory.createForClass(Applicant);
