export type CreateProductInput = {
  name: string;
  price: number;
  stock: number;
  description: string | null;
};

export type GetProductByUidInput = { uid: string };

export type AddProductCategoriesInput = {
  productUid: string;
  categoryUids: string[];
};


