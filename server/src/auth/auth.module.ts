import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LoggerService } from 'src/common/logger/logger.service';
import { MongooseModule } from '@nestjs/mongoose';
import { userSchema } from '@/user/model/user.schema';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from '@/common/guard/auth.guard';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: userSchema }]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthGuard, LoggerService],
})
export class AuthModule {}
