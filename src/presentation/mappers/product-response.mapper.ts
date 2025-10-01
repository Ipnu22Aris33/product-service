import { ProductEntity } from '@domain/entities/product.entity';

export class ProductResponseMapper {
  static toCreate(product: ProductEntity) {
    return {
      ...this.base(product),
      createdAt: product.getCreatedAt(),
    };
  }

  static toFindByUid(product: ProductEntity) {
    return {
      ...this.base(product),
      categories: product.getCategories().map((cats) => cats.getUid()),
      createdAt: product.getCreatedAt(),
      updatedAt: product.getUpdatedAt(),
    };
  }

  static toFindAll(product: ProductEntity[]) {
    return product.map((products) => ({
      ...this.base(products),
      categories: products.getCategories().map((cats) => cats.getUid()),
      createdAt: products.getCreatedAt(),
      updatedAt: products.getUpdatedAt(),
    }));
  }

  private static base(product: ProductEntity) {
    return {
      uid: product.getUid(),
      code: product.getCode(),
      name: product.getName(),
      price: product.getPrice(),
      stock: product.getStock(),
      description: product.getDescription(),
    };
  }
}
