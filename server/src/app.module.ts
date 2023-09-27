import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LoggerService } from './common/logger/logger.service';
import { AllExceptionsFilter } from './common/exceptions/all-exceptions-filter';
import { APP_FILTER } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URL, {}),
    AuthModule,
  ],
  controllers: [],
  providers: [
    LoggerService,
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {}
