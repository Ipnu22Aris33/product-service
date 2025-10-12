import { StatusEnumType } from "@domain/value-objects";

export class ProductCategoryModel {
  uid: string;
  productUid: string;
  categoryUid: string;
  status: StatusEnumType
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
