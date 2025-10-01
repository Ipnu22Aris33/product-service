import {
  ProductEntity,
  ProductEntityProps,
} from '@domain/entities/product.entity';
import {
  CodeVO,
  DescriptionVO,
  NameVO,
  PriceVO,
  StockVO,
  UidVO,
} from '@domain/value-object';

export class ProductFactory {
  static create(props: {
    name: NameVO;
    price: PriceVO;
    stock: StockVO;
    description: DescriptionVO | null;
  }): ProductEntity {
    const productProps: ProductEntityProps = {
      ...props,
      uid: UidVO.create(),
      code: CodeVO.create(),
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    };
    return ProductEntity.fromProps(productProps);
  }
}
