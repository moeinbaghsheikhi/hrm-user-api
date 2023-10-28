import { PartialType } from '@nestjs/mapped-types';
import { CreateAttendanceDto } from './create-attendance.dto';
import { IsNumber, IsDate, IsPositive, IsDateString, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import AttendanceStatus from '../enum/AttendanceStatusEnum';
import AttendanceType from '../enum/AttendanceTypeEnum';

export class ExitAttendanceDto extends PartialType(CreateAttendanceDto) {

  @ApiProperty({
    description: 'زمان پایان حضور',
    example: "2023-09-03T14:00:36.278Z",
    required: true,
  })
  @IsDateString({}, { message: 'زمان پایان باید یک زمان معتبر باشد' })
  end_time: Date;

}