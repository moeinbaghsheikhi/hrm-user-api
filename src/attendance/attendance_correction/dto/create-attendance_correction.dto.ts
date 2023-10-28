import { IsNumber, IsDate, IsPositive, IsDateString, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import AttendanceCorrectionStatus from '../enum/AttendanceCorrectionStatusEnum';
import AttendanceStatus from 'src/attendance/attendance/enum/AttendanceStatusEnum';

export class CreateAttendanceCorrectionDto {
  @ApiProperty({
    description: 'شناسه حضور',
    example: 1,
    type: 'integer',
    minimum: 1,
    required: true,
  })
  @IsNumber({}, { message: 'شناسه حضور باید یک عدد صحیح باشد' })
  @IsPositive({ message: 'شناسه حضور باید مقدار مثبت داشته باشد' })
  attendance_id: number;

  @ApiProperty({
    description: 'تاریخ حضور',
    example: "2023-09-03T14:00:36.278Z",
    required: true,
    type: Date, // از نوع Date بودن به عنوان تاریخ معتبر کافیست
  })
  @IsDateString({}, { message: 'تاریخ باید یک تاریخ معتبر باشد' })
  date: Date;

  @ApiProperty({
    description: 'زمان شروع حضور',
    example: "2023-09-03T14:00:36.278Z",
    required: true,
  })
@IsDateString({}, { message: 'زمان شروع باید یک زمان معتبر باشد' })
  start_time: Date;

  @ApiProperty({
    description: 'زمان پایان حضور',
    example: "2023-09-03T14:00:36.278Z",
    required: true,
  })
  @IsDateString({}, { message: 'زمان پایان باید یک زمان معتبر باشد' })
  end_time: Date;

  @ApiProperty({
    description: 'توضیحات',
    example: "تست",
    required: false,
  })
  description: string;

  @ApiProperty({
    description: 'وضعیت',
    enum: AttendanceCorrectionStatus,
    default: AttendanceCorrectionStatus.SET, // یک مقدار پیشفرض می‌توانید تعیین کنید
    required: true,
  })
  @IsEnum(AttendanceCorrectionStatus, { message: 'وضعیت حضور و غیاب نامعتبر است' })
  status: AttendanceCorrectionStatus;
}