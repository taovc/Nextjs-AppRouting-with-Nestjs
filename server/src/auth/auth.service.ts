import { Injectable, NotFoundException } from '@nestjs/common';
import { userSchema } from '@/user/model/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/auth.dto';
import { CoreResponseDto } from '@/common/dto/reponse.dto';
const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<typeof userSchema>,
    private readonly jwtService: JwtService,
  ) {}

  async login(registerDto: RegisterDto): Promise<CoreResponseDto> {
    let user = null;
    let token = null;
    let tempToken = null;
    try {
      user = await this.userModel.findOne({ email: registerDto.email });
      if (user === null) {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(registerDto.password, salt);
        user = await this.userModel.create({
          email: registerDto.email,
          password: hashPassword,
        });
      } else {
        const isMatch = await bcrypt.compare(
          registerDto.password,
          user['password'],
        );
        if (!isMatch) {
          return {
            success: false,
            message: 'Invalid email or password',
          };
        }
      }
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
    try {
      if (registerDto.rememberMe) {
        token = await this.jwtService.signAsync(
          { _id: user._id },
          {
            secret: process.env.JWT_SECRET,
            expiresIn: '5min',
          },
        );
      }
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
    tempToken = await this.jwtService.signAsync(
      { _id: user._id },
      {
        secret: process.env.JWT_SECRET,
        expiresIn: '1d',
      },
    );
    return {
      success: true,
      data: {
        user: {
          _id: user._id,
          email: user.email,
          profile: user.profile,
          tempToken: tempToken,
        },
        token: token,
      },
      message: 'Login success',
    };
  }

  async token(token: string): Promise<any> {
    let tempToken = null;
    try {
      const decoded = await this.jwtService.verifyAsync(token);
      const user = await this.userModel.findById(decoded._id);
      if (!user) {
        throw new NotFoundException('User not found');
      }
      tempToken = await this.jwtService.signAsync(
        { _id: user._id },
        {
          secret: process.env.JWT_SECRET,
          expiresIn: '1d',
        },
      );
      return {
        success: true,
        data: {
          user: {
            _id: user._id,
            email: user['email'],
            profile: user['profile'],
            tempToken: tempToken,
          },
          token: token,
        },
        message: 'Get user success',
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  async profile(_id: string): Promise<any> {
    let tempToken = null;
    try {
      const user = await this.userModel.findById(_id);
      if (!user) {
        throw new NotFoundException('User not found');
      }
      tempToken = await this.jwtService.signAsync(
        { _id: user._id },
        {
          secret: process.env.JWT_SECRET,
          expiresIn: '1d',
        },
      );
      return {
        success: true,
        data: {
          user: {
            _id: user._id,
            email: user['email'],
            profile: user['profile'],
            tempToken: tempToken,
          },
        },
        message: 'Get profile success',
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  async updateProfile(newProfil: any, _id: string): Promise<any> {
    let user = null;
    try {
      user = await this.userModel.findById(_id);
      if (!user) {
        throw new NotFoundException('User not found');
      }
      if (newProfil.profile.create) {
        const existingPlaylistItem = user.profile.playlist.find(
          (item) => item.title === newProfil.profile.playlist,
        );
        if (!existingPlaylistItem) {
          user['profile']['playlist'].push({
            title: newProfil.profile.playlist,
            movies: [],
          });
        } else {
          return {
            success: false,
            message: 'Playlist already exists',
          };
        }
      } else {
        user['profile'] = {
          ...user['profile'],
          ...newProfil.profile,
        };
      }
      await user.save();
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
    return {
      success: true,
      data: user['profile'],
      message: 'Update profile success',
    };
  }

  async me(req): Promise<any> {
    const user = await this.userModel.findById(req.user._id);
    return user;
  }
}
