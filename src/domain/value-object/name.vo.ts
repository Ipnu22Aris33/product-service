export class NameVO {
  private constructor(private readonly value: string) {}

  static create(value: string): NameVO {
    if (!value || value.trim().length === 0) {
      throw new Error('Name cannot be empty');
    }
    return new NameVO(value.trim());
  }

  static fromValue(value: string): NameVO {
    return new NameVO(value);
  }

  getValue(): string {
    return this.value;
  }

  equals(other: NameVO): boolean {
    return this.value === other.value;
  }
}
