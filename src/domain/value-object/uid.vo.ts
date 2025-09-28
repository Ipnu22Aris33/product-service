import { v4 as uuid4 } from 'uuid';

export class UidVO {
  private constructor(private readonly value: string) {}

  static create(): UidVO {
    return new UidVO(uuid4());
  }

  static fromValue(value: string): UidVO {
    return new UidVO(value);
  }

  getValue(): string {
    return this.value;
  }

  equals(other: UidVO): boolean {
    return this.value === other.value;
  }
}
