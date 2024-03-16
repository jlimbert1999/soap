import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'niveles' })
export class Level extends Document {
  @Prop({ type: Number, required: true })
  nivel: number;

  @Prop({ type: Number })
  sueldo: number;

  @Prop({ type: Number })
  cajaSalud: number;

  @Prop({ type: Number })
  solidario: number;

  @Prop({ type: Number })
  profecional: number;

  @Prop({ type: Number })
  proVivienda: number;
}
export const LevelSchema = SchemaFactory.createForClass(Level);
