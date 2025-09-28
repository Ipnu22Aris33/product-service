import { UnprocessableEntityException } from '@nestjs/common';

export class DescriptionVO {
  private constructor(private readonly value: string) {}

  static create(value: string | null): DescriptionVO | null {
    if (value === null) return null;
    this.validate(value);
    return new DescriptionVO(value);
  }

  static fromValue(value: string | null): DescriptionVO | null {
    if (value === null) return null;
    return new DescriptionVO(value);
  }

  getValue(): string {
    return this.value;
  }

  equals(other: DescriptionVO): boolean {
    return this.value === other.value;
  }

  private static validate(value: string): void {
    const trimmed = value.trim();

    if (trimmed.length === 0) {
      throw new UnprocessableEntityException('Description tidak boleh kosong.');
    }
  }
}
