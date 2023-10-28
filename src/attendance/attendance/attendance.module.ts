import { Module } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { AttendanceController } from './attendance.controller';
import { Attendance } from './entities/attendance.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QueryService } from 'src/helper/query.service';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Attendance]), UserModule],
  controllers: [AttendanceController],
  providers: [AttendanceService, QueryService], 
})
export class AttendanceModule {}
