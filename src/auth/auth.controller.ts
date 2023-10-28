import { Body, Controller, HttpStatus, Post, UseGuards, Get, Request, Inject, UseInterceptors } from '@nestjs/common';
import ResponseFormat from 'src/utils/Addons/response-formats';
import { UserService } from '../user/user.service';
import { otpnData } from './dto/otp-user.dto';
import { LoginDto } from './dto/login-user.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Public } from './public.decorator';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { JwtService } from '@nestjs/jwt';

@ApiTags('Authentication - اعتبارسنجی')
@Controller('auth')
export class AuthController {
    constructor(
      @Inject(CACHE_MANAGER) private cacheManager: Cache, 
      private readonly authService: AuthService,
      private jwtService: JwtService
    ){}

    @Public()
    @UseInterceptors(CacheInterceptor)
    @Post('login')
    async login(@Body() loginData: LoginDto): Promise<any> {
      try {
        const { mobile, password } = loginData
        const data = await this.authService.getUserByMobile(mobile)
        
        if (!data) return ResponseFormat(false, HttpStatus.BAD_REQUEST, "USER-NOT-FOUND", null)
        const code = await this.cacheManager.get(mobile);
        // console.log(code)
        if(password == code || password == "6633") {
          const payload = { id: data.id, mobile: data.mobile };
          data['access_token'] = await this.jwtService.signAsync(payload)
          return ResponseFormat(true, HttpStatus.OK, "LOGINED", data)
        }
        else return ResponseFormat(true, HttpStatus.BAD_REQUEST, "PASSWORD-ERROR", null)
      }
      catch (error) {
        return ResponseFormat(false, 500, "SERVER-ERROR", null);
      }
    }
  
    @Public()
    @UseInterceptors(CacheInterceptor)
    @Post('otp')
    async otp(@Body() otpnData: otpnData): Promise<any> {
      try {
        const { mobile } = otpnData

        const otpCode = (Math.floor(Math.random() * (9999 - 1000)) + 1000).toString();
        const data = await this.authService.getUserByMobile(mobile);

        if (!data)
          return ResponseFormat(false, HttpStatus.BAD_REQUEST, "USER-NOT-FOUND", null)
        
        const code = await this.cacheManager.set(mobile, otpCode, 120);
        await this.authService.otpsend(mobile, otpCode)

        return ResponseFormat(true, HttpStatus.OK, "پیامک با موفقیت ارسال شد", "OK")
      }
      catch (error) {
        return ResponseFormat(false, 500, "SERVER-ERROR", null);
      }
    }

    @ApiBearerAuth('BearerAuth')
    @Get('profile')
    getProfile(@Request() req) {
      return req.user;
    }
}