import { HttpStatus } from '@nestjs/common';

export class BaseResponse<T> {
  code?: number = HttpStatus.OK;
  message?: string;
  data: T;

  constructor(data: T, message?: string, code?: number) {
    this.code = code ?? HttpStatus.OK;
    this.message = message ?? '';
    this.data = data;
  }
}
