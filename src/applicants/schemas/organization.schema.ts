import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Organization extends Document {
  @Prop({ required: true, uppercase: true })
  name: string;
}
export const OrganizationSchema = SchemaFactory.createForClass(Organization);
