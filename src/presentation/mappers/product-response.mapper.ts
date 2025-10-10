import { ProductEntity } from '@domain/entities/product.entity';

export class ProductResponseMapper {
  static toCreate(product: ProductEntity) {
    return {
      ...this.base(product),
      createdAt: product.getCreatedAtValue(),
    };
  }

  static toAddCategory(product: ProductEntity) {
    return {
      ...this.base(product),
      categories: product.getProductCategories().map((cats) => {
        return {
          uid: cats.getUidValue(),
          categoryUid: cats.getCategoryUidValue(),
        };
      }),
      createdAt: product.getCreatedAtValue(),
      updatedAt: product.getUpdatedAtValue(),
    };
  }

  static toFindByUid(product: ProductEntity) {
    return {
      ...this.base(product),
      categories: product.getProductCategories().map((cats) => {
        return {
          uid: cats.getUidValue(),
          categoryUid: cats.getCategoryUidValue(),
        };
      }),
      createdAt: product.getCreatedAtValue(),
      updatedAt: product.getUpdatedAtValue(),
    };
  }

  static toFindAll(product: ProductEntity[]) {
    return product.map((products) => ({
      ...this.base(products),
      categories: products.getProductCategories().map((cats) => {
        return {
          uid: cats.getUidValue(),
          categoryUid: cats.getCategoryUidValue(),
        };
      }),
      createdAt: products.getCreatedAtValue(),
      updatedAt: products.getUpdatedAtValue(),
    }));
  }

  private static base(product: ProductEntity) {
    return {
      uid: product.getUidValue(),
      code: product.getCodeValue(),
      name: product.getNameValue(),
      price: product.getPriceValue(),
      stock: product.getStockValue(),
      description: product.getDescriptionValue(),
    };
  }
}
