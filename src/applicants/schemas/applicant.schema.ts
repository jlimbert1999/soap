import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Endorser } from './endorser.schema';
import { ApplicantDocuments, ApplicantStatus } from '../interfaces';

@Schema()
export class Applicant extends Document {
  @Prop({})
  firstname: string;

  @Prop({})
  middlename: string;

  @Prop({})
  lastname: string;

  @Prop({})
  dni: string;

  @Prop({})
  professional_profile: string;

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
