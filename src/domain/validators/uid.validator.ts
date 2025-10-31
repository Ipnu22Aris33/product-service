import { UnprocessableEntityException } from '@nestjs/common';

export class UidValidator {
  static validate(value: string) {
    if (!value) throw new UnprocessableEntityException('Validation failed');
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(value)) {
      throw new UnprocessableEntityException('Invalid Uid');
    }
  }
}
