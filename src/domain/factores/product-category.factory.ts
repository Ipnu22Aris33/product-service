import { UidVO } from '@domain/value-objects';
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

  createNew(props: { props: ProductCategoryFactoryProps; actor?: UidVO }) {
    return this.create({
      props: {
        productUid: props.props.productUid,
        categoryUid: props.props.categoryUid,
      },
      actor: props.actor,
    });
  }

  reconstruct(props: ProductCategoryEntityProps): ProductCategoryEntity {
    return this.entityClass.create(props);
  }
}
