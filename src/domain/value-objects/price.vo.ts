import { BaseVO } from '@domain/base/base.vo';
import { BadRequestException, UnprocessableEntityException } from '@nestjs/common';

export class PriceVO extends BaseVO<number> {
  private constructor(value: number) {
    super(value);
  }

  static create(value: number): PriceVO {
    this.validate(value);
    return new PriceVO(value);
  }

  static fromValue(value: number): PriceVO {
    return new PriceVO(value);
  }

  add(other: PriceVO): PriceVO {
    return new PriceVO(this.value + other.value);
  }

  multiply(quantity: number): PriceVO {
    if (quantity <= 0) {
      throw new UnprocessableEntityException('Quantity must be greater than 0');
    }
    return new PriceVO(this.value * quantity);
  }

  private static validate(value: number): void {
    if (value === null || value === undefined) {
      throw new BadRequestException('Price is required');
    }
    if (isNaN(value) || !isFinite(value)) {
      throw new UnprocessableEntityException('Price must be a valid number');
    }
    if (value <= 0) {
      throw new UnprocessableEntityException('Price must be greater than 0');
    }
  }
}
