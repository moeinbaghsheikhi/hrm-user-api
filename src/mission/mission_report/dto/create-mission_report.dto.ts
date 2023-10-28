import { IsNumber, IsString, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMissionReportDto {
  @ApiProperty({
    description: 'شناسه ماموریت',
    example: 1,
    type: 'integer',
    minimum: 1,
    required: true,
  })
  @IsNumber({}, { message: 'شناسه ماموریت باید یک عدد صحیح باشد' })
  mission: number;

  @ApiProperty({
    description: 'زمان شروع ماموریت',
    example: "2023-09-03T14:00:36.278Z",
    required: true,
    type: Date,
  })
  @IsDateString({}, { message: 'زمان شروع ماموریت باید یک تاریخ معتبر باشد' })
  start_time: Date;

  @ApiProperty({
    description: 'زمان پایان ماموریت',
    example: "2023-09-03T16:30:36.278Z",
    required: true,
    type: Date,
  })
  @IsDateString({}, { message: 'زمان پایان ماموریت باید یک تاریخ معتبر باشد' })
  end_time: Date;

  @ApiProperty({
    description: 'توضیحات گزارش',
    example: 'گزارش ماموریت با موفقیت ارسال شد',
    required: true,
  })
  @IsString({ message: 'توضیحات باید یک رشته معتبر باشد' })
  comment: string;
}
