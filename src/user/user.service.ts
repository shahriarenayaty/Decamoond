import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.model';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from '../app-config';
import { ShahriarError } from '../utils/error/my-exception';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly configService: ConfigService<AppConfig>,
  ) {}

  async findByPhone(phone: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ phone });
  }

  async updateOtp(phone: string, otp: string): Promise<UserDocument> {
    const user = await this.findByPhone(phone);
    if (user) {
      user.verifyCode = otp;
      user.sendVerifyCodeData = new Date();
      return user.save();
    }
    return this.userModel.create({
      phone,
      verifyCode: otp,
      sendVerifyCodeData: new Date(),
    });
  }

  async validateOtp(phone: string, otp: string): Promise<UserDocument> {
    const user = await this.findByPhone(phone);
    if (!user || user.verifyCode !== otp) {
      throw new UnauthorizedException('Invalid OTP');
    }
    // OTP is valid for 2 minutes
    const now = new Date();
    const otpTime = new Date(user.sendVerifyCodeData);
    const expirTime = this.configService.get<number>('JWT_EXPIRES_IN')  // default 2 minutes
    if (now.getTime() - otpTime.getTime() > expirTime * 1000) {
      throw new UnauthorizedException('OTP expired');
    }

    user.verifiedAt = new Date();
    user.verifyCode = null;
    return user.save();
  }

  async canSendOtp(phone: string): Promise<void> {
    const user = await this.findByPhone(phone);
    if (user) {
      const sendVerifyCodeData = user.sendVerifyCodeData;
      const expirTime = this.configService.get<number>('JWT_EXPIRES_IN'); // default 2 minutes
      if (
        sendVerifyCodeData &&
        new Date().getTime() - sendVerifyCodeData.getTime() < expirTime * 1000
      ) {
        const waitTime =
          expirTime * 1000 -
          (new Date().getTime() - sendVerifyCodeData.getTime());
        throw new ShahriarError(
          'OTP already sent, please wait before requesting a new one',
          {
            status: 429,
            showMessageString: `Please wait ${Math.ceil(waitTime / 1000)} seconds before requesting a new OTP.`,
          },
        );
      }
    }
  }
}
