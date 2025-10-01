import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';

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

  @Prop({ type: Date, default: Date.now() })
  createdAt: Date;

  @Prop({ type: Date, default: Date.now() })
  updatedAt: Date;

  @Prop({ type: Date, default: null })
  deletedAt: Date | null;
}
export type ProductDocument = Product & Document;
export const ProductSchema = SchemaFactory.createForClass(Product);
