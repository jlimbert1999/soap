import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Roles } from '../interfaces/roles.enum';

@Schema({ collection: 'account' })
export class User extends Document {
  @Prop({
    type: String,
    required: true,
    unique: true,
  })
  login: string;

  @Prop({
    type: String,
    required: true,
  })
  password: string;

  @Prop({
    type: [String],
    enum: Object.values(Roles),
    default: [Roles.USER],
  })
  roles: Roles[];
}

export const UserSchema = SchemaFactory.createForClass(User);
