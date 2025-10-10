export class ProductModel {
  uid: string;
  code: string;
  name: string;
  price: number;
  stock: number;
  description: string | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
