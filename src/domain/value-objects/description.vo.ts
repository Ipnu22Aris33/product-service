import { BaseVO } from '@domain/base/base.vo';
import { UnprocessableEntityException } from '@nestjs/common';

export class DescriptionVO extends BaseVO<string> {
  private constructor(value: string) {
    super(value);
  }

  /**
   * Create a new DescriptionVO instance.
   * @param value The description value.
   * @returns A new DescriptionVO instance or null if invalid.
   * |
   *
   */

  static create(value?: string | null): DescriptionVO | null {
    const normalized = this.normalized(value);
    if (!normalized) return null;
    this.validate(normalized);
    return new DescriptionVO(normalized);
  }

  /**
   * Create a new DescriptionVO instance from a value.
   * @param value The description value.
   * @returns A new DescriptionVO instance or null if invalid.
   */

  static fromValue(value?: string | null): DescriptionVO | null {
    const normalized = this.normalized(value);
    if (normalized === null) return null;
    return new DescriptionVO(normalized);
  }

  /**
   * Normalize the description value.
   * @param value The description value.
   * @returns The normalized description value or null if invalid.
   */

  private static normalized(value?: string | null): string | null {
    if (!value) return null;
    const trimmed = value.trim();
    return trimmed === '' ? null : trimmed;
  }

  private static validate(value: string) {
    if (value.length > 254)
      throw new UnprocessableEntityException('Description is too long');
  }
}
