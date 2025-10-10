import { UnprocessableEntityException } from '@nestjs/common';

export class StockVO {
  private constructor(private readonly value: number) {}

  static create(value: number): StockVO {
    this.validate(value);
    return new StockVO(value);
  }

  static fromValue(value: number): StockVO {
    return new StockVO(value);
  }

  getValue(): number {
    return this.value;
  }

  equals(other: StockVO): boolean {
    return this.value === other.value;
  }

  private static validate(value: number): void {
    if (value < 0) throw new UnprocessableEntityException();
  }
}
