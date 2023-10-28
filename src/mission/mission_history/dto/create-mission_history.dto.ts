import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMissionHistoryDto {
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
    description: 'عملیات',
    example: 'شروع ماموریت',
    required: true,
  })
  @IsString({ message: 'عملیات باید یک رشته معتبر باشد' })
  action: string;
}
