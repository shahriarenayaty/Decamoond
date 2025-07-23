import { HttpException, HttpStatus } from '@nestjs/common';

export class ShahriarError extends HttpException {
  static reasonSameAsMessage = '';
  constructor(
    public reason: string,
    public myOptions?: {
      showMessageString?: string;
      status?: number;
    },
  ) {
    super(reason, HttpStatus.BAD_REQUEST);
  }
}
