export class DescriptionVO {
  private constructor(private readonly value: string) {}

  /**
   * Create a new DescriptionVO instance.
   * @param value The description value.
   * @returns A new DescriptionVO instance or null if invalid.
   * |
   *
   */

  static create(value?: string | null): DescriptionVO | null {
    const normalized = this.normalized(value);
    if (normalized === null) return null;
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
   * Get the description value.
   * @returns The description value.
   */

  getValue(): string {
    return this.value;
  }

  /**
   * Check if this DescriptionVO instance is equal to another.
   * @param other The other DescriptionVO instance.
   * @returns True if equal, false otherwise.
   */

  equals(other: DescriptionVO): boolean {
    return this.value === other.value;
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
}
