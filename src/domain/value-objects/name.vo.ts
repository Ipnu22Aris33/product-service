import { BaseVO } from '@domain/base/base.vo';

export class NameVO extends BaseVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(value: string): NameVO {
    this.validate(value);
    return new NameVO(value);
  }

  static fromValue(value: string): NameVO {
    return new NameVO(value);
  }

  private static validate(value: string) {
    if (!value) throw new Error('Name is required');
    if (value.trim().length === 0) throw new Error('Name invalid');
    if (value.length > 254) throw new Error('Name is too long');
    if (!/^[a-zA-Z\s]+$/.test(value)) throw new Error('Name invalid');
  }
}
