import { StatusEnumType } from "@domain/value-objects";

export class ProductModel {
  uid: string;
  code: string;
  name: string;
  price: number;
  stock: number;
  description: string | null;
  status: StatusEnumType
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
