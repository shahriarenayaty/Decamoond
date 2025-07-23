import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../user/user.service';
import { ShahriarError } from '../utils/error/my-exception';
import { AppConfig } from '../app-config';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService<AppConfig>,
  ) {}

  async requestOtp(phone: string): Promise<{ message: string }> {
    //validate phone number format if necessary
    const isValidPhone = /^\+?[1-9]\d{1,14}$/.test(phone);
    if (!isValidPhone) {
      throw new ShahriarError('Phone number format must be valid', {
        status: 400,
        showMessageString: 'Invalid phone number format',
      });
    }
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    console.log(`OTP for ${phone}: ${otp}`); // Log OTP instead of sending SMS
    await this.userService.canSendOtp(phone);
    await this.userService.updateOtp(phone, otp);
    return { message: 'OTP sent' };
  }

  async verifyOtp(phone: string, code: string): Promise<{ token: string }> {
    const user = await this.userService.validateOtp(phone, code);
    const payload = { phone: user.phone, sub: user._id };
    return {
      token: this.jwtService.sign(payload),
    };
  }
}
