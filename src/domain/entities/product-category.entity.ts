import { BaseEntity, BaseEntityProps } from '@domain/base/base.entity';
import { StatusEnumType, StatusVO, UidVO } from '@domain/value-objects';

export interface ProductCategoryEntityProps extends BaseEntityProps {
  productUid: UidVO;
  categoryUid: UidVO;
  status: StatusVO;
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

  changeStatus(props: { newStatus: StatusVO; actor?: UidVO }) {
    const { newStatus, actor } = props;
    if (!this.props.status.equals(newStatus)) {
      if (actor) this.props.productUid = actor;
      this.props.status = newStatus;
      this.touch(actor);
    }
  }

  activate(): void {
    if (this.props.status.getValue() !== StatusEnumType.ACTIVE) {
      this.props.status = StatusVO.create(StatusEnumType.ACTIVE);
      this.touch();
    }
  }

  deactivate(): void {
    if (this.props.status.getValue() !== StatusEnumType.INACTIVE) {
      this.props.status = StatusVO.create(StatusEnumType.INACTIVE);
      this.touch();
    }
  }

  getProductUidValue(): string {
    return this.props.productUid.getValue();
  }
  getCategoryUidValue(): string {
    return this.props.categoryUid.getValue();
  }
  getStatusValue(): StatusEnumType {
    return (this, this.props.status.getValue());
  }

  equals(other: ProductCategoryEntity): boolean {
    if (!other) return false;
    return (
      this.getProductUidValue() === other.getProductUidValue() &&
      this.getCategoryUidValue() === other.getCategoryUidValue()
    );
  }
}
