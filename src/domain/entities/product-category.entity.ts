import { BaseEntity, BaseEntityProps } from '@domain/base/base.entity';
import { UidVO } from '@domain/value-objects';

export interface ProductCategoryEntityProps extends BaseEntityProps {
  productUid: UidVO;
  categoryUid: UidVO;
}

export class ProductCategoryEntity extends BaseEntity<ProductCategoryEntityProps> {
  private constructor(props: ProductCategoryEntityProps) {
    super(props);
  }

  static create(props: ProductCategoryEntityProps): ProductCategoryEntity {
    return new ProductCategoryEntity(props);
  }

  static reconstruct(props: ProductCategoryEntityProps): ProductCategoryEntity {
    return new ProductCategoryEntity(props);
  }

  getProductUidValue(): string {
    return this.props.productUid.getValue();
  }
  getCategoryUidValue(): string {
    return this.props.categoryUid.getValue();
  }

  equals(other: ProductCategoryEntity): boolean {
    if (!other) return false;
    return (
      this.getProductUidValue() === other.getProductUidValue() &&
      this.getCategoryUidValue() === other.getCategoryUidValue()
    );
  }
}
