import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class ChangeStatusDto {
    @ApiProperty()
    @IsInt({ message: 'user_id باید یک عدد صحیح باشد' })
    id: number;
}
