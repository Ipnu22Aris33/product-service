import { AddProductCategoriesResult } from '@application/types/product-use-case.type';
import { ProductEntity } from '@domain/entities/product.entity';

export class ProductResponseMapper {
  static toCreate(product: ProductEntity) {
    return {
      ...this.base(product),
      createdAt: product.getCreatedAtValue(),
    };
  }

 static toAddCategory(result: AddProductCategoriesResult) {
    if (!result.product) return null;

    const categoryMap = new Map(
      result.added.details.map((cat) => [cat.getUidValue(), cat])
    );

    return {
      message: result.message,
      product: {
        ...this.base(result.product),
        createdAt: result.product.getCreatedAtValue(),
        updatedAt: result.product.getUpdatedAtValue(),
      },
      added: {
        count: result.added.count,
        categories: result.added.categories.map((cat) => {
          const detail = categoryMap.get(cat.getCategoryUidValue());
          
          return {
            uid: cat.getUidValue(),
            productUid: cat.getProductUidValue(),
            categoryUid: cat.getCategoryUidValue(),
            status: cat.getStatusValue(),
            createdAt: cat.getCreatedAtValue(),
            categoryName: detail?.getNameValue(),
          };
        }),
      },
      notFound: result.notFound,
    };
  }

  static toFindByUid(product: ProductEntity | null) {
    if (!product) return;
    return {
      ...this.base(product),
      // categories: product.getProductCategories().map((cats) => {
      //   return {
      //     uid: cats.getUidValue(),
      //     categoryUid: cats.getCategoryUidValue(),
      //   };
      // }),
      createdAt: product.getCreatedAtValue(),
      updatedAt: product.getUpdatedAtValue(),
    };
  }

  static toFindAll(product: ProductEntity[]) {
    return product.map((products) => ({
      ...this.base(products),
      // categories: products.getProductCategories().map((cats) => {
      //   return {
      //     uid: cats.getUidValue(),
      //     categoryUid: cats.getCategoryUidValue(),
      //   };
      // }),
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
