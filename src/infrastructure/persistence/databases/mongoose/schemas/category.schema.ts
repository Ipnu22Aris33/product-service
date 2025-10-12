import { StatusEnumType } from '@domain/value-objects';
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

  @Prop({ type: String, enum: StatusEnumType})
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

export type CategoryDocument = Category & Document;
export const CategorySchema = SchemaFactory.createForClass(Category);
