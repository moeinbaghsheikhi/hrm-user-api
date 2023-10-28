import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateMissionDto } from './create-mission.dto';
import { IsInt, IsString, IsDate, IsNotEmpty, IsNumber, Min, Max, IsEnum } from 'class-validator';
import MissionType from '../enum/MissionTypeEnum';

export class UpdateMissionDto extends PartialType(CreateMissionDto) {

    @IsInt({ message: 'manager_id باید یک عدد صحیح باشد' })
    manager_id: number;

    @IsInt({ message: 'project_id باید یک عدد صحیح باشد' })
    project_id: number;

    @ApiProperty({
        description: 'نوع ماموریت',
        enum: MissionType,
        default: MissionType.INTERNAL, // یک مقدار پیشفرض می‌توانید تعیین کنید
        required: true,
    })
    @IsEnum(MissionType, { message: 'نوع ماموریت نامعتبر است' })
    type: MissionType;

    @IsString({ message: 'place باید یک رشته معتبر باشد' })
    @IsNotEmpty({ message: 'place نمی‌تواند خالی باشد' })
    place: string;

    // @IsDate({ message: 'from_date باید یک تاریخ معتبر باشد' })
    from_date: Date;

    // @IsDate({ message: 'until_date باید یک تاریخ معتبر باشد' })
    until_date: Date;

    @IsString({ message: 'behest باید یک رشته معتبر باشد' })
    @IsNotEmpty({ message: 'behest نمی‌تواند خالی باشد' })
    behest: string;

    @IsString({ message: 'manager_description باید یک رشته معتبر باشد' })
    manager_description: string;

    @IsInt({ message: 'commission باید یک عدد صحیح باشد' })
    @Min(0, { message: 'commission نمی‌تواند منفی باشد' })
    commission: number;

    @IsInt({ message: 'salary باید یک عدد صحیح باشد' })
    @Min(0, { message: 'salary نمی‌تواند منفی باشد' })
    salary: number;

}
