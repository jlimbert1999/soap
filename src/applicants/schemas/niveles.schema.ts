import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'niveles' })
export class Nivel extends Document {
  @Prop({})
  name: string;
  @Prop({})
  nivel: number;
  @Prop({})
  sueldo: number;
  @Prop({})
  cajaSalud: number;
  @Prop({})
  solidario: number;
  @Prop({})
  profecional: number;
  @Prop({})
  proVivienda: number;
}
export const NivelSchema = SchemaFactory.createForClass(Nivel);
