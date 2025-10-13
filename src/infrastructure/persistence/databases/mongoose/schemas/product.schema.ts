import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { StatusEnumType } from '@domain/value-objects';
import { ProductModel } from '@infrastructure/persistence/models/product.model';

@Schema({ collection: 'products' })
export class Product extends Document implements ProductModel{
  @Prop({ type: String, required: true, unique: true }) uid: string;
  @Prop({ type: String, required: true }) code: string;
  @Prop({ type: String, required: true }) name: string;
  @Prop({ type: Number, required: true }) price: number;
  @Prop({ type: Number, required: true }) stock: number;
  @Prop({ type: String, required: false, default: null }) description: string | null;
  @Prop({ type: String, required: true, enum: StatusEnumType }) status: StatusEnumType;
  @Prop({ type: String, required: false, default: null }) createdBy: string | null;
  @Prop({ type: String, required: false, default: null }) updatedBy: string | null;
  @Prop({ type: String, required: false, default: null }) deletedBy: string | null;
  @Prop({ type: Date, required: true, default: Date.now }) createdAt: Date;
  @Prop({ type: Date, required: true, default: Date.now }) updatedAt: Date;
  @Prop({ type: Date, required: false, default: null }) deletedAt: Date | null;
}

export type ProductDocument = Product & Document;
export const ProductSchema = SchemaFactory.createForClass(Product);
