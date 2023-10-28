// وارد کردن ماژول‌های مورد نیاز از NestJS
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// وارد کردن ماژول‌های میکروسرویس‌ها و موجودیت‌ها
import { AttendanceCorrectionModule } from './attendance/attendance_correction/attendance_correction.module';
import { AttendanceModule } from './attendance/attendance/attendance.module';
import { MissionModule } from './mission/mission/mission.module';
import { MissionHistoryModule } from './mission/mission_history/mission_history.module';
import { MissionReportModule } from './mission/mission_report/mission_report.module';
import { LeavesModule } from './leaves/leaves.module';
import { TeleworkingModule } from './teleworking/teleworking.module';

// وارد کردن موجودیت‌های مورد نیاز
import { Attendance } from './attendance/attendance/entities/attendance.entity';
import { AttendanceCorrection } from './attendance/attendance_correction/entities/attendance_correction.entity';
import { Mission } from './mission/mission/entities/mission.entity';
import { MissionHistory } from './mission/mission_history/entities/mission_history.entity';
import { MissionReport } from './mission/mission_report/entities/mission_report.entity';
import { Leaves } from './leaves/entities/leaves.entity';
import { Teleworking } from './teleworking/entities/teleworking.entity';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { HelperModule } from './helper/helper.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ // وارد کردن ماژول‌های NestJS به عنوان ورودی ماژول اصلی
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres', // نوع پایگاه داده PostgreSQL
      host: process.env.DB_HOST, // آدرس میزبان پایگاه داده
      port: process.env.PORT ? parseInt(process.env.DB_PORT) : 5432, // پورت پایگاه داده
      username: process.env.DB_USERNAME, // نام کاربری برای ورود به پایگاه داده
      password: process.env.DB_PASSWORD, // رمز عبور برای ورود به پایگاه داده (در اینجا خالی است)
      database: process.env.DB_NAME, // نام پایگاه داده
      entities: [Attendance, AttendanceCorrection, Mission, MissionHistory, MissionReport, Leaves, Teleworking, User], // لیست موجودیت‌های مورد استفاده در پایگاه داده
      synchronize: true, // همگام‌سازی خودکار پایگاه داده (در محیط توسعهی مفید است)
    }),
    AttendanceModule,
    AttendanceCorrectionModule,
    MissionModule,
    MissionHistoryModule,
    MissionReportModule,
    LeavesModule,
    TeleworkingModule,
    UserModule,
    AuthModule,
    HelperModule
  ],
})
export class AppModule { }