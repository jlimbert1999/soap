import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Organization } from './organization.schema';

@Schema()
export class Endorser extends Document {
  @Prop({ })
  name: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: Organization.name,
  })
  organization: string;
}
export const EndorserSchema = SchemaFactory.createForClass(Endorser);
