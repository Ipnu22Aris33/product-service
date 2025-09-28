import {
  UidVO,
  CodeVO,
  NameVO,
  PriceVO,
  StockVO,
  DescriptionVO,
} from '@domain/value-object';

export interface ProductEntityProps {
  uid: UidVO;
  code: CodeVO;
  name: NameVO;
  price: PriceVO;
  description: DescriptionVO | null;
  stock: StockVO;
  createdAt: Date;
  createdBy: UidVO;
  updatedAt: Date;
  updatedBy: UidVO;
  deletedAt: Date | null;
  deletedBy: UidVO | null;
}
