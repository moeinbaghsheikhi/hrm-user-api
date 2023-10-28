import { IsArray, IsInt, IsNumber, IsOptional, IsPositive, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsNull } from 'typeorm';

class FieldDto {
  @ApiProperty({
    description: 'کلید',
    example: 'id',
    type: [String, Array],
    required: true,
  })
  @IsOptional()
  key: string | string[];

  @ApiProperty({
    description: 'شرط',
    example: '=',
    type: 'string',
    required: true,
  })
  @IsString({ message: 'شرط باید یک رشته باشد' })
  condition: string;

  @ApiProperty({
    description: 'مقدار (می‌تواند رشته یا آرایه باشد)',
    example: '1',
    type: [String, Array],
  })
  @IsOptional()
  value: string | string[];
}

export class FilterParamsDto {
  @ApiProperty({
    description: 'شماره صفحه',
    example: 1,
    type: 'integer',
    minimum: 1,
    required: true,
  })
  @IsInt({ message: 'شماره صفحه باید یک عدد صحیح باشد' })
  @IsPositive({ message: 'شماره صفحه باید مقدار مثبت داشته باشد' })
  pageNumber: number;

  @ApiProperty({
    description: 'اندازه صفحه',
    example: 10,
    type: 'integer',
    minimum: 1,
    required: true,
  })
  @IsInt({ message: 'اندازه صفحه باید یک عدد صحیح باشد' })
  @IsPositive({ message: 'اندازه صفحه باید مقدار مثبت داشته باشد' })
  pageSize: number;

  @ApiProperty({
    description: 'فیلدها',
    example: [
      {
        key: 'id',
        condition: '=',
        value: '1',
      },
    ],
    type: 'array',
    items: {
      type: 'object',
      properties: {
        key: {
          type: 'string',
        },
        condition: {
          type: 'string',
        },
        value: {
          type: 'string',
        },
      },
    },
    required: true,
  })
  @IsArray({ message: 'فیلدها باید یک آرایه باشد' })
  @ValidateNested({ each: true, message: 'هر فیلد باید مقادیر کلید، شرط و مقدار را داشته باشد' })
  @Type(() => FieldDto)
  @IsOptional({ each: true })
  fields: FieldDto[];
}
