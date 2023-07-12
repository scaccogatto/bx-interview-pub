import { BadRequestException, ValidationError } from '@nestjs/common';

export class DtoValidationException extends BadRequestException {
  constructor(errors: ValidationError[]) {
    super(errors);
  }
}
