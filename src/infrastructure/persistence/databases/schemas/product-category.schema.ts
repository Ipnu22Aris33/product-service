import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'product-categories' })
export class ProductCategory extends Document {
  @Prop({ type: String, required: true, unique: true })
  uid: string;

  @Prop({ type: String, required: true })
  productUid: string;

  @Prop({ type: String, required: true })
  categoryUid: string;

  // @Prop({ type: String })
  // createdBy: string;

  // @Prop({ type: String })
  // updatedBy: string;

  // @Prop({ type: String, default: null })
  // deletedBy: string | null;

  @Prop({ type: Date, default: Date.now() })
  createdAt: Date;

  @Prop({ type: Date, default: Date.now() })
  updatedAt: Date;

  @Prop({ type: Date, default: null })
  deletedAt: Date | null;
}

export type ProductCategoryDocument = ProductCategory & Document;
export const ProductCategorySchema =
  SchemaFactory.createForClass(ProductCategory);
