// import { IsString } from 'class-validator';
import { userSchema } from '@/user/model/user.schema';
import { PickType } from '@nestjs/swagger';
import { Model } from 'mongoose';

export class CreateUserDto extends PickType(Model<typeof userSchema>, [
  'email',
  'password',
] as const) {}
