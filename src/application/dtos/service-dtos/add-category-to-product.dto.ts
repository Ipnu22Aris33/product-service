export class AddProductCategoriesServiceDTO {
  productUid!: string;
  categoryUids!: string[];
  actor?: string | null;
}
