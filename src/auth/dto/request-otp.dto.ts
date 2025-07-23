import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RequestOtpDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  phone: string;
}
