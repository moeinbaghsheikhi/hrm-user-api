import { Module } from '@nestjs/common';
import { TeleworkingService } from './teleworking.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Teleworking } from './entities/teleworking.entity';
import { TeleworkingController } from './teleworking.controller';
import { QueryService } from 'src/helper/query.service';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Teleworking]), UserModule], // وارد کردن مدل داده تله‌کاری به ماژول
  controllers: [TeleworkingController], // تعیین کنترلر‌های مربوط به ماژول
  providers: [TeleworkingService, QueryService], // تعیین سرویس‌های مورد استفاده در ماژول
})
export class TeleworkingModule { }