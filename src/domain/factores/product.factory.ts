import { BaseFactory } from '@domain/base/base.factory';
import {
  ProductEntity,
  ProductEntityProps,
} from '@domain/entities/product.entity';
import {
  CodeVO,
  DescriptionVO,
  NameVO,
  PriceVO,
  StatusEnumType,
  StatusVO,
  StockVO,
  UidVO,
} from '@domain/value-objects';

export interface ProductFactoryProps {
  name: NameVO;
  price: PriceVO;
  stock: StockVO;
  description: DescriptionVO | null;
}

export class ProductFactory extends BaseFactory<{
  factoryProps: ProductFactoryProps;
  entityProps: ProductEntityProps;
  entity: ProductEntity;
}> {
  protected entityClass = ProductEntity;

  protected getDefaults(): Partial<ProductEntityProps> {
    return {
      status: StatusVO.create(StatusEnumType.ACTIVE),
      code: CodeVO.generate(),
    };
  }

  createNew(props: { props: ProductFactoryProps; actor?: UidVO }) {
    return this.create({
      props: {
        name: props.props.name,
        price: props.props.price,
        stock: props.props.stock,
        description: props.props.description,
      },
      actor: props.actor,
    });
  }
}
