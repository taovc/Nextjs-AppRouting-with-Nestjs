import { userSchema } from '@/user/model/user.schema';
import { PickType } from '@nestjs/swagger';
import { IsString, IsBoolean } from 'class-validator';
import { Model } from 'mongoose';

export class RegisterDto extends PickType(Model<typeof userSchema>, [
  'email' as string,
  'password' as string,
] as const) {
  @IsString()
  email: string;
  @IsString()
  password: string;
  @IsBoolean()
  rememberMe: boolean;
}
