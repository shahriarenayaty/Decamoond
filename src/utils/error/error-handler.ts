import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { validate, ValidationError } from 'class-validator';
import { FastifyRequest, FastifyReply } from 'fastify';
import { ErrorDto } from './error.dto';
import { ShahriarError } from './my-exception';

@Catch()
export class ErrorHandler implements ExceptionFilter {
  constructor() {}
  async catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();
    const request = ctx.getRequest<FastifyRequest>();

    const status = exception.status || HttpStatus.INTERNAL_SERVER_ERROR;
    const message = 'An error occurred while processing your request';
    const reason =
      exception.message || 'Internal server error in error handler';
    const stack = exception.stack || '';
    const errorDto = new ErrorDto(message, reason, status, stack);

    if (exception instanceof ShahriarError) {
      errorDto.reason = exception.reason;
      if (exception?.myOptions?.showMessageString)
        errorDto.message = exception.myOptions.showMessageString;
      if (errorDto.reason === '') errorDto.reason = errorDto.message;
      if (exception.myOptions && exception.myOptions.status)
        errorDto.status = exception.myOptions.status;
    }

    const errors = await validate(errorDto);
    if (errors.length > 0) {
      errorDto.reason = this.generateValidationErrorMessage(errors);
    }
    return this.handleHttpException(response, errorDto, request);

    //if it is an error throw from resolver of graph Ql
  }

  private generateValidationErrorMessage(errors: ValidationError[]): string {
    const reasons = [];
    errors.forEach((er) => {
      Object.keys(er.constraints).forEach((key) => {
        const value = er.constraints[key];
        reasons.push(value);
      });
    });
    return reasons.join(', ');
  }
  private handleHttpException(
    response: FastifyReply,
    errorDto: ErrorDto,
    request: FastifyRequest,
  ) {
    const errorModel = errorDto.toHttpErrorModel(request);
    response.status(errorDto.status).send(errorModel);
  }
}
