import {
  UidVO,
  CodeVO,
  NameVO,
  PriceVO,
  StockVO,
  DescriptionVO,
} from '@domain/value-objects';
import { ProductCategoryEntity } from './product-category.entity';
import { BaseEntity, BaseEntityProps } from '@domain/base/base.entity';
import { StatusEnumType, StatusVO } from '@domain/value-objects/status.vo';

export interface ProductEntityProps extends BaseEntityProps {
  code: CodeVO;
  name: NameVO;
  price: PriceVO;
  stock: StockVO;
  status: StatusVO;
  description: DescriptionVO | null;
}

export class ProductEntity extends BaseEntity<ProductEntityProps> {
  private constructor(props: ProductEntityProps) {
    super(props);
  }

  static create(props: ProductEntityProps): ProductEntity {
    return new ProductEntity(props);
  }

  static reconstruct(props: ProductEntityProps): ProductEntity {
    return new ProductEntity(props);
  }

  changePrice() {}

  changeStock() {}

  getNameValue(): string {
    return this.props.name.getValue();
  }
  getCodeValue(): string {
    return this.props.code.getValue();
  }
  getPriceValue(): number {
    return this.props.price.getValue();
  }
  getStockValue(): number {
    return this.props.stock.getValue();
  }
  getDescriptionValue(): string | null {
    return this.props.description ? this.props.description.getValue() : null;
  }
  getStatusValue(): StatusEnumType {
    return this.props.status.getValue();
  }
}
