export class PriceVO {
  private constructor(private readonly price: number) {}

  static create(value: number): PriceVO {
    if (typeof value !== 'number' || isNaN(value) || value <= 0) {
      throw new Error('Price must be a positive number greater than 0');
    }
    return new PriceVO(value);
  }

  static fromValue(price: number): PriceVO {
    return new PriceVO(price);
  }

  getValue(): number {
    return this.price;
  }

  toNumber(): number {
    return this.price;
  }
}
