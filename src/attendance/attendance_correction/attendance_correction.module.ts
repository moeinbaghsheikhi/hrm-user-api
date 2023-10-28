import { Module } from '@nestjs/common';
import { AttendanceCorrectionService } from './attendance_correction.service';
import { AttendanceCorrectionController } from './attendance_correction.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attendance } from '../attendance/entities/attendance.entity';
import { AttendanceCorrection } from './entities/attendance_correction.entity';
import { AttendanceService } from '../attendance/attendance.service';
import { QueryService } from 'src/helper/query.service';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Attendance , AttendanceCorrection]), UserModule],
  controllers: [AttendanceCorrectionController],
  providers: [AttendanceCorrectionService, AttendanceService, QueryService],
})
export class AttendanceCorrectionModule {}
