import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Organization } from './organization.schema';

@Schema()
export class Endorser extends Document {
  @Prop({ type: String, required: true, uppercase: true })
  name: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: Organization.name,
  })
  organization: Organization;
}
export const EndorserSchema = SchemaFactory.createForClass(Endorser);
