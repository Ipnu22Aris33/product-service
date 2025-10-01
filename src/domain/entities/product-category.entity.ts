import { UidVO } from '@domain/value-object';

export interface ProductCategoryEntityProps {
  uid: UidVO;
  productUid: UidVO;
  categoryUid: UidVO;
  createdBy: UidVO;
  updatedBy: UidVO;
  deletedBy: UidVO | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export class ProductCategoryEntity {
  private constructor(private readonly props: ProductCategoryEntityProps) {}

  static fromProps(props: ProductCategoryEntityProps): ProductCategoryEntity {
    return new ProductCategoryEntity(props);
  }

  getUid(): string {
    return this.props.uid.getValue();
  }
}
