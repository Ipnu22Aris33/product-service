import { ProductEntity } from '@domain/entities/product.entity';
import {
  CodeVO,
  DescriptionVO,
  NameVO,
  PriceVO,
  StockVO,
  UidVO,
} from '@domain/value-objects';
import { ProductModel } from '@infrastructure/persistence/models/product.model';
import { ProductCategoryMapper } from './product-category.mapper';
import { Category } from '../databases/schemas/category.schema';

export class ProductMapper {
  static fromPersistence(product: ProductModel): ProductEntity {
    return ProductEntity.reconstruct(
      {
        uid: UidVO.fromValue(product.uid),
        code: CodeVO.fromValue(product.code),
        name: NameVO.fromValue(product.name),
        price: PriceVO.fromValue(product.price),
        stock: StockVO.fromValue(product.stock),
        description: DescriptionVO.fromValue(product.description),
        isActive: product.isActive,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt,
        deletedAt: product.deletedAt,
      },
    );
  }

  static fromPersistenceArray(products: ProductModel[]): ProductEntity[] {
    return products.map((p) => this.fromPersistence(p));
  }

  static toPersistence(product: ProductEntity): ProductModel {
    return {
      uid: product.getUidValue(),
      code: product.getCodeValue(),
      name: product.getNameValue(),
      price: product.getPriceValue(),
      stock: product.getStockValue(),
      description: product.getDescriptionValue(),
      isActive: product.getIsActiveValue(),
      createdAt: product.getCreatedAtValue(),
      updatedAt: product.getUpdatedAtValue(),
      deletedAt: product.getDeletedAtValue(),
    };
  }

  static toPersistenceArray(products: ProductEntity[]): ProductModel[] {
    return products.map((p) => this.toPersistence(p));
  }
}
