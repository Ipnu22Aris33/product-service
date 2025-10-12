import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { StatusEnumType } from '@domain/value-objects';

@Schema({ collection: 'products' })
export class Product extends Document {
  @Prop({ required: true, unique: true })
  uid: string;

  @Prop({ required: true, unique: true })
  code: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  stock: number;

  @Prop({ type: String, default: null })
  description: string | null;

  @Prop({ type: String, enum: StatusEnumType })
  status: StatusEnumType;

  @Prop({ type: String, default:null })
  createdBy: string;

  @Prop({ type: String, default:null })
  updatedBy: string;

  @Prop({ type: String, default: null })
  deletedBy: string;

  @Prop({ type: Date, default: Date.now() })
  createdAt: Date;

  @Prop({ type: Date, default: Date.now() })
  updatedAt: Date;

  @Prop({ type: Date, default: null })
  deletedAt: Date | null;
}
export type ProductDocument = Product & Document;
export const ProductSchema = SchemaFactory.createForClass(Product);
