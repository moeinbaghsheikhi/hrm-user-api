import { PartialType, ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { CreateMissionHistoryDto } from './create-mission_history.dto';

export class UpdateMissionHistoryDto extends PartialType(CreateMissionHistoryDto) {
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
