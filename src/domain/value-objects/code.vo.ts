import { randomBytes } from 'crypto';

export class CodeVO {
  private constructor(private readonly code: string) {}

  static create(): CodeVO {
    const code = [...randomBytes(6)].map((b) => 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'[b % 36]).join('');
    return new CodeVO(code);
  }

  static fromValue(code: string): CodeVO {
    return new CodeVO(code);
  }

  getValue(): string {
    return this.code;
  }

  toString(): string {
    return this.code;
  }
}
