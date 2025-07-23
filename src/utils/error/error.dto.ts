import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { FastifyRequest } from 'fastify';
import { HttpErrorModel } from './error.model';

export class ErrorDto {
  @IsNotEmpty()
  @IsNumber()
  status: number;
  @IsNotEmpty()
  @IsString()
  reason: string;
  @IsNotEmpty()
  @IsString()
  message: string;
  @IsNotEmpty()
  @IsString()
  stack: string;

  constructor(message: string, reason: string, status: number, stack: string) {
    this.message = message;
    this.reason = reason;
    this.stack = stack;
    this.status = status;
  }

  toHttpErrorModel(req: FastifyRequest): HttpErrorModel {
    const headers = this.getHeader(req);
    console.log(`Headers: ${headers}`);
    // Uncomment the following line if you want to include the request body
    // const body = this.getBody(req);
    return new HttpErrorModel(
      this.reason,
      this.message,
      this.status,
      this.stack,
    );
  }
  //todo:Use the fast-json-stringify library to serialize the response body instead of JSON.stringify() to improve performance.
  private getHeader(req: FastifyRequest) {
    return req.headers
      ? JSON.stringify(req.headers, null, 2)
          .replace(/[{}"]/g, '')
          .replace(/:/g, ': ')
      : '';
  }
  private getBody(req: FastifyRequest) {
    return req.body
      ? JSON.stringify(req.body, null, 2)
          .replace(/[{}"]/g, '')
          .replace(/:/g, ':s ')
      : '';
  }
}
