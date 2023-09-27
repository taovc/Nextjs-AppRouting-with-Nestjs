import {
  Controller,
  Get,
  Post,
  Body,
  Req,
  UseGuards,
  Put,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/auth.dto';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
import { LoggerService } from '@/common/logger/logger.service';
import { AuthGuard } from '@/common/guard/auth.guard';

@ApiTags('auth')
@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly logger: LoggerService,
  ) {}

  @Post('login')
  login(@Body() registerDto: RegisterDto) {
    this.logger.log('Creating/Login account...', 'POST' + ' /login');
    return this.authService.login(registerDto);
  }

  @Get('profile')
  @UseGuards(AuthGuard)
  profile(@Req() req: any) {
    this.logger.log('Getting profile...', 'GET' + ' /profile');
    return this.authService.profile(req.user._id);
  }

  @Put('profile')
  @UseGuards(AuthGuard)
  updateProfile(@Body() newProfil: any, @Req() req: any) {
    this.logger.log('Updating profile...', 'PUT' + ' /profile');
    console.log('newProfil', newProfil, req.user._id);
    return this.authService.updateProfile(newProfil, req.user._id);
  }

  @Post('token')
  token(@Body() token: any) {
    this.logger.log('Refreshing token...', 'POST' + ' /token');
    return this.authService.token(token);
  }

  // @Get('me')
  // @ApiHeader({
  //   name: 'Authorization',
  //   description: 'Bearer token',
  // })
  // @UseGuards(AuthGuard)
  // me(@Req() req: any) {
  //   this.logger.log('Me...', 'GET' + ' /me');
  //   return this.authService.me(req);
  // }
}
