import { StatusEnumType } from '@domain/value-objects';
import { CategoryModel } from '@infrastructure/persistence/models/category.model';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'categories' })
export class Category extends Document implements CategoryModel {
  @Prop({ type: String, required: true, unique: true }) uid: string;
  @Prop({ type: String, required: true, unique: true }) name: string;
  @Prop({ type: String, required: false, default: null }) description: string | null;
  @Prop({ type: String, required: true, enum: StatusEnumType }) status: StatusEnumType;
  @Prop({ type: String, required: false, default: null }) createdBy: string | null;
  @Prop({ type: String, required: false, default: null }) updatedBy: string | null;
  @Prop({ type: String, required: false, default: null }) deletedBy: string | null;
  @Prop({ type: Date, required: true, default: Date.now }) createdAt: Date;
  @Prop({ type: Date, required: true, default: Date.now }) updatedAt: Date;
  @Prop({ type: Date, required: false, default: null }) deletedAt: Date | null;
}

export type CategoryDocument = Category & Document;
export const CategorySchema = SchemaFactory.createForClass(Category);
