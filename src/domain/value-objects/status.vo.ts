import { BaseVO } from '@domain/base/base.vo';
import { UnprocessableEntityException } from '@nestjs/common';

export enum StatusEnumType {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export class StatusVO extends BaseVO<StatusEnumType> {
  private constructor(value: StatusEnumType) {
    super(value);
  }

  static create(value: string | StatusEnumType): StatusVO {
    const normalized = this.normalize(value);
    this.validate(normalized);
    return new StatusVO(normalized);
  }

  static fromValue(value: StatusEnumType): StatusVO {
    return new StatusVO(value);
  }

  private static normalize(value: string | StatusEnumType): StatusEnumType {
    if (!value) {
      throw new UnprocessableEntityException('Status tidak boleh kosong');
    }

    // Jika sudah enum, langsung return
    if (Object.values(StatusEnumType).includes(value as StatusEnumType)) {
      return value as StatusEnumType;
    }

    // Jika string biasa, ubah jadi uppercase dan cek apakah valid
    const upperValue = value
      .toString()
      .toUpperCase() as keyof typeof StatusEnumType;

    if (!(upperValue in StatusEnumType)) {
      throw new UnprocessableEntityException(
        `Invalid status value: ${value}. Allowed: ${Object.values(StatusEnumType).join(', ')}`,
      );
    }

    return StatusEnumType[upperValue];
  }

  private static validate(value: StatusEnumType): void {
    const allowed = Object.values(StatusEnumType);
    if (!allowed.includes(value)) {
      throw new UnprocessableEntityException(
        `Invalid order status type: ${value}`,
      );
    }
  }
}
