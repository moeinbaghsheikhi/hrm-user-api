import { IsNumber, IsDate, IsPositive, IsDateString, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import AttendanceStatus from '../enum/AttendanceStatusEnum';
import AttendanceType from '../enum/AttendanceTypeEnum';

export class CreateAttendanceDto {

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
    description: 'نوع حضور و غیاب',
    enum: AttendanceType,
    default: AttendanceType.DEVICE, // یک مقدار پیشفرض می‌توانید تعیین کنید
    required: true,
  })
  @IsEnum(AttendanceType, { message: 'وضعیت حضور و غیاب نامعتبر است' })
  type: AttendanceType;

  // @ApiProperty({
  //   description: 'وضعیت حضور و غیاب',
  //   enum: AttendanceStatus,
  //   default: AttendanceStatus.UNFINISHED, // یک مقدار پیشفرض می‌توانید تعیین کنید
  //   required: true,
  // })
  // @IsEnum(AttendanceStatus, { message: 'وضعیت حضور و غیاب نامعتبر است' })
  // status: AttendanceStatus;
}