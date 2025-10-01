import { ProductEntity } from '@domain/entities/product.entity';
import {
  CodeVO,
  DescriptionVO,
  NameVO,
  PriceVO,
  StockVO,
  UidVO,
} from '@domain/value-object';
import { ProductDocument } from '@infrastructure/databases/schemas/product.schema';

export class ProductMapper {
  static fromPersistence(product: ProductDocument): ProductEntity {
    return ProductEntity.fromProps({
      uid: UidVO.fromValue(product.uid),
      code: CodeVO.fromValue(product.code),
      name: NameVO.fromValue(product.name),
      price: PriceVO.fromValue(product.price),
      stock: StockVO.fromValue(product.stock),
      description: DescriptionVO.fromValue(product.description),
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
      deletedAt: product.deletedAt,
    });
  }

  static toPersistence(product: ProductEntity): Partial<ProductDocument> {
    return product.toObject();
  }
}
