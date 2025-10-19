import { BadRequestException, ValidationError } from '@nestjs/common';

export const ValidationExceptionFactory = (errors: ValidationError[]) => {
  const messages = errors.map(err => ({
    field: err.property,
    errors: Object.values(err.constraints || {}),
  }));

  return new BadRequestException({
    status: 'error',
    message: 'Validation failed',
    errors: messages,
  });
};
