import { StatusEnumType } from "@domain/value-objects";

export class CategoryModel {
  uid: string;
  name: string;
  description: string | null;
  status: StatusEnumType
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
