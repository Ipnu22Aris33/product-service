import {
  AddProductCategoriesResult,
  GetProductByUidResult,
} from '@application/types/product-use-case.type';
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
      result.added.details.map((cat) => [cat.getUidValue(), cat]),
    );

    return {
      message: result.message,
      data: {
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
        notFound: {
          count: result.notFound.count,
          categories: result.notFound.categoryUids,
        },
      },
    };
  }

  static toFindByUid(res: GetProductByUidResult | null) {
    if (!res) return;

    const categoryMap = new Map(
      res.categoryDetails.map((cat) => [cat.getUidValue(), cat]),
    );
    return {
      message: res.message,
      data: {
        uid: res.product.getUidValue(),
        name: res.product.getNameValue(),
        code: res.product.getCodeValue(),
        price: res.product.getPriceValue(),
        stock: res.product.getStockValue(),
        description: res.product.getDescriptionValue(),
        status: res.product.getStatusValue(),
        categories: res.productCategories.map((cat) => {
          const detail = categoryMap.get(cat.getCategoryUidValue());
          return {
            uid: cat.getUidValue(),
            categoryUid: cat.getCategoryUidValue(),
            categoryName: detail?.getNameValue(),
            createdBy: cat.getCreatedByValue(),
            updatedBy: cat.getUpdatedByValue(),
            status: cat.getStatusValue(),
            createdAt: cat.getCreatedAtValue(),
            updatedAt: cat.getUpdatedAtValue(),
          };
        }),
        createdAt: res.product.getCreatedAtValue(),
        updatedAt: res.product.getUpdatedAtValue(),
      },
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
