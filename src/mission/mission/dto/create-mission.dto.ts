import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, IsDate, IsNotEmpty, IsNumber, Min, Max, IsEnum } from 'class-validator';
import MissionStatus from '../enum/MissionStatusEnum';
import MissionType from '../enum/MissionTypeEnum';

export class CreateMissionDto {

    @ApiProperty()
    @IsInt({ message: 'manager_id باید یک عدد صحیح باشد' })
    manager_id: number;

    @ApiProperty()
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

    @ApiProperty()
    @IsString({ message: 'place باید یک رشته معتبر باشد' })
    @IsNotEmpty({ message: 'place نمی‌تواند خالی باشد' })
    place: string;

    // @IsDate({ message: 'from_date باید یک تاریخ معتبر باشد' })
    @ApiProperty()
    from_date: Date;

    // @IsDate({ message: 'until_date باید یک تاریخ معتبر باشد' })
    @ApiProperty()
    until_date: Date;

    @ApiProperty()
    @IsString({ message: 'behest باید یک رشته معتبر باشد' })
    @IsNotEmpty({ message: 'behest نمی‌تواند خالی باشد' })
    behest: string;

    @ApiProperty()
    @IsString({ message: 'manager_description باید یک رشته معتبر باشد' })
    manager_description: string;

    @ApiProperty()
    @IsInt({ message: 'commission باید یک عدد صحیح باشد' })
    @Min(0, { message: 'commission نمی‌تواند منفی باشد' })
    commission: number;

    @ApiProperty()
    @IsInt({ message: 'salary باید یک عدد صحیح باشد' })
    @Min(0, { message: 'salary نمی‌تواند منفی باشد' })
    salary: number;

    @ApiProperty({
        description: 'وضعیت',
        enum: MissionStatus,
        default: MissionStatus.SET, // یک مقدار پیشفرض می‌توانید تعیین کنید
        required: true,
    })
    @IsEnum(MissionStatus, { message: 'وضعیت نامعتبر است' })
    status: MissionStatus;
}
