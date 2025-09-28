import { UidVO } from '@domain/value-object';

export interface ProductCategoryEntityProps {
  uid: UidVO;
  productUid: UidVO;
  categoryUid: UidVO;
  createdAt: Date;
  createdBy: UidVO;
  updatedAt: Date;
  updatedBy: UidVO;
  deletedAt: Date | null;
  deletedBy: UidVO | null;
}
