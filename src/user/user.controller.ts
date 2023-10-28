import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import ResponseFormat from 'src/utils/Addons/response-formats';
import { HttpStatus } from '@nestjs/common/enums';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/auth/public.decorator';
import { FilterParamsDto } from 'src/public/dto/get-by-filter.dto';

@Controller('user')
@ApiTags('user - کاربران')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Public()
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const data = await this.userService.create(createUserDto);
    return ResponseFormat(true, HttpStatus.CREATED, "CREATED", data);
  }

  @ApiBearerAuth('BearerAuth')
  @Get()
  async findAll() {
    const data = await this.userService.findAll();
    return ResponseFormat(true, HttpStatus.OK, "OK", data);
  }

  @ApiBearerAuth('BearerAuth')
  @Post('/getByFilter')
  async findAllByFilter(@Body() filter: FilterParamsDto){
    try {
      const data = await this.userService.findAllByFilter(filter);

      return ResponseFormat(true, 200, "OK", data);

    } catch (error) {
      // در صورت بروز خطا، پاسخ خطا به کاربر ارسال می‌شود
      console.log(error)
      return ResponseFormat(false, 500, "SERVER-ERROR", null);
    }
  }

  @ApiBearerAuth('BearerAuth')
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const data = await this.userService.findOne(+id);
    return ResponseFormat(true, HttpStatus.OK, "OK", data);
  }

  @ApiBearerAuth('BearerAuth')
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const data = await this.userService.update(+id, updateUserDto);
    return ResponseFormat(true, HttpStatus.OK, "OK", data);
  }

  @ApiBearerAuth('BearerAuth')
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const data = await this.userService.remove(+id);
    return ResponseFormat(true, HttpStatus.OK, "OK", data);
  }
}
