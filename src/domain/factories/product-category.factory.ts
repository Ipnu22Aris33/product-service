import { StatusEnumType, StatusVO, UidVO } from '@domain/value-objects';
import {
  ProductCategoryEntity,
  ProductCategoryEntityProps,
} from '@domain/entities/product-category.entity';
import { BaseFactory } from '@domain/base/base.factory';

export type ProductCategoryFactoryProps = {
  productUid: UidVO;
  categoryUid: UidVO;
};

export class ProductCategoryFactory extends BaseFactory<{
  factoryProps: ProductCategoryFactoryProps;
  entityProps: ProductCategoryEntityProps;
  entity: ProductCategoryEntity;
}> {
  protected entityClass = ProductCategoryEntity;

  protected getDefaults(): Partial<ProductCategoryEntityProps> {
    return {
      status: StatusVO.create(StatusEnumType.ACTIVE),
    };
  }

  createNew(props: { props: ProductCategoryFactoryProps; actor?: UidVO }) {
    return this.create({
      props: props.props,
      actor: props.actor,
    });
  }
}
