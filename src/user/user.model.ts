import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true })
  phone: string;

  @Prop()
  sendVerifyCodeData: Date;

  @Prop()
  verifyCode: string;

  @Prop()
  verifiedAt: Date;
}
export const UserSchema = SchemaFactory.createForClass(User);
