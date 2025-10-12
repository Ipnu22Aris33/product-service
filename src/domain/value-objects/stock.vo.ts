import { BaseVO } from '@domain/base/base.vo';
import { UnprocessableEntityException } from '@nestjs/common';

export class StockVO extends BaseVO<number> {
  private constructor(value: number) {
    super(value);
  }

  static create(value: number): StockVO {
    this.validate(value);
    return new StockVO(value);
  }

  static fromValue(value: number): StockVO {
    return new StockVO(value);
  }

  private static validate(value: number): void {
    if (value === null || value === undefined || isNaN(value)) {
      throw new UnprocessableEntityException(
        'Stock value must be a valid number',
      );
    }

    if (!Number.isInteger(value)) {
      throw new UnprocessableEntityException('Stock value must be an integer');
    }

    if (value < 0) {
      throw new UnprocessableEntityException('Stock cannot be negative');
    }

    if (value > 1_000_000) {
      throw new UnprocessableEntityException('Stock value is too large');
    }
  }
}
