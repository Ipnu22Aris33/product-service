import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'categories' })
export class Category extends Document {
  @Prop({ type: String, required: true, unique: true })
  uid: string;

  @Prop({ type: String, required: true, unique: true })
  name: string;

  @Prop({ type: String, default: null })
  description: string | null;

  @Prop({ type: Boolean, default: true })
  isActive: boolean;

  @Prop({ type: Date, default: Date.now() })
  createdAt: Date;

  @Prop({ type: String })
  createdBy: string;

  @Prop({ type: Date, default: Date.now() })
  updatedAt: Date;

  @Prop({ type: String })
  updatedBy: string;

  @Prop({ type: Date, default: null })
  deletedAt: Date | null;

  @Prop({ type: String, default: null })
  deletedBy: string;
}

export type CategoryDocument = Category & Document;
export const CategorySchema = SchemaFactory.createForClass(Category);
