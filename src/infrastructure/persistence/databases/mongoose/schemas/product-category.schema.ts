import { StatusEnumType } from '@domain/value-objects';
import { ProductCategoryModel } from '@infrastructure/persistence/models/product-category.model';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'product-categories' })
export class ProductCategory extends Document implements ProductCategoryModel{
  @Prop({ type: String, required: true, unique: true }) uid: string;
  @Prop({ type: String, required: true }) productUid: string;
  @Prop({ type: String, required: true }) categoryUid: string;
  @Prop({ type: String, required: true, enum: StatusEnumType }) status: StatusEnumType;
  @Prop({ type: String, required: false, default: null }) createdBy: string | null;
  @Prop({ type: String, required: false, default: null }) updatedBy: string | null;
  @Prop({ type: String, required: false, default: null }) deletedBy: string | null;
  @Prop({ type: Date, required: true, default: Date.now }) createdAt: Date;
  @Prop({ type: Date, required: true, default: Date.now }) updatedAt: Date;
  @Prop({ type: Date, required: false, default: null }) deletedAt: Date | null;
}

export type ProductCategoryDocument = ProductCategory & Document;
export const ProductCategorySchema = SchemaFactory.createForClass(ProductCategory);
