import { BaseVO } from '@domain/base/base.vo';
import { BadRequestException } from '@nestjs/common';
import { randomBytes } from 'crypto';

export class CodeVO extends BaseVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static generate(): CodeVO {
    const datePart = new Date().toISOString().slice(2, 10).replace(/-/g, '');
    const randomPart = this.generateRandomCode(3);
    const code = `PRD-${datePart}-${randomPart}`;
    return new CodeVO(code);
  }

  static create(value: string): CodeVO {
    this.validate(value);
    return new CodeVO(value);
  }

  static fromValue(code: string): CodeVO {
    return new CodeVO(code);
  }

  private static generateRandomCode(length: number): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    return Array.from({ length }, () =>
      chars.charAt(Math.floor(Math.random() * chars.length)),
    ).join('');
  }

  private static validate(value: string): void {
    if (!/^PRD-[A-Z0-9]{6}-[A-Z0-9]{3}$/.test(value)) {
      throw new BadRequestException('Invalid product code format');
    }
  }
}
