import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { HttpModule } from '@nestjs/axios';
import { UserModule } from 'src/user/user.module';
import { jwtConstants } from './constants';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard';
import { CacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store';

@Module({
  imports: [HttpModule, UserModule, 
    CacheModule.register({
      isGlobal: true,
      store: redisStore,
      host: 'localhost',
      port: 6379,
    }),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '30d' },
    }),],
  controllers: [AuthController],
  providers: [AuthService,  {
    provide: APP_GUARD,
    useClass: AuthGuard,
  },]
})
export class AuthModule {}