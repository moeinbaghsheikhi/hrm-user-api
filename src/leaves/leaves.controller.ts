import { Controller, Get, Post, Body, Patch, Param, Delete, Request } from '@nestjs/common';
import { LeavesService } from './leaves.service';
import { CreateLeavesDto } from './dto/create-leaves.dto';
import { UpdateleavesDto } from './dto/update-leaves.dto';
import ResponseFormat, { ResponseFormatType } from 'src/utils/Addons/response-formats';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FilterParamsDto } from 'src/public/dto/get-by-filter.dto';
import { ChangeStatusDto } from 'src/public/dto/change-status.dto';

@ApiTags('leaves - مرخصی ها')
@Controller('leaves')
export class LeavesController {
  constructor(private readonly leavesService: LeavesService) { }

  // ایجاد یک مرخصی جدید
  @ApiBearerAuth('BearerAuth')
  @Post()
  async create(@Request() req, @Body() createLeavesDto: CreateLeavesDto) {
    try {
      const data = await this.leavesService.create(req.user.id, createLeavesDto);
      return ResponseFormat(true, 200, "OK", data);

    } catch (error) {
      // در صورت بروز خطا، پاسخ خطا به کاربر ارسال می‌شود
      return ResponseFormat(false, 500, "SERVER-ERROR", null);
    }
  }

  // دریافت تمام مرخصی‌ها
  @ApiBearerAuth('BearerAuth')
  @Get()
  async findAll(@Request() req): Promise<ResponseFormatType> {
    try {
      const data = await this.leavesService.findAll(req.user.id);
      return ResponseFormat(true, 200, "OK", data);

    } catch (error) {
      // در صورت بروز خطا، پاسخ خطا به کاربر ارسال می‌شود
      return ResponseFormat(false, 500, "SERVER-ERROR", null);
    }
  }

  @ApiBearerAuth('BearerAuth')
  @Post('/getByFilter')
  async findAllByFilter(@Request() req, @Body() filter: FilterParamsDto) {
    try {
      const data = await this.leavesService.findAllByFilter(req.user.id, filter);

      return ResponseFormat(true, 200, "OK", data);

    } catch (error) {
      // در صورت بروز خطا، پاسخ خطا به کاربر ارسال می‌شود
      console.log(error)
      return ResponseFormat(false, 500, "SERVER-ERROR", null);
    }
  }

  // دریافت یک مرخصی براساس شناسه
  @ApiBearerAuth('BearerAuth')
  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const data = await this.leavesService.findOne(+id);
      return ResponseFormat(true, 200, "OK", data);

    } catch (error) {
      // در صورت بروز خطا، پاسخ خطا به کاربر ارسال می‌شود
      return ResponseFormat(false, 500, "SERVER-ERROR", null);
    }
  }

  // به‌روزرسانی مرخصی براساس شناسه
  @ApiBearerAuth('BearerAuth')
  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateleaveDto: UpdateleavesDto) {
    try {
      const data = await this.leavesService.update(id, updateleaveDto);
      return ResponseFormat(true, 200, "OK", data);

    } catch (error) {
      // در صورت بروز خطا، پاسخ خطا به کاربر ارسال می‌شود
      return ResponseFormat(false, 500, "SERVER-ERROR", null);
    }
  }

  @ApiBearerAuth('BearerAuth')
  @Post('/set')
  async setStatusLeaves(@Body() leaves: ChangeStatusDto) {
    try {
      const data = await this.leavesService.changeStatusSET(leaves.id);

      return ResponseFormat(true, 200, "OK", data);

    } catch (error) {
      // در صورت بروز خطا، پاسخ خطا به کاربر ارسال می‌شود
      console.log(error)
      return ResponseFormat(false, 500, "SERVER-ERROR", null);
    }
  }

  @ApiBearerAuth('BearerAuth')
  @Post('/confirm')
  async confirmStatusLeaves(@Body() leaves: ChangeStatusDto) {
    try {
      const data = await this.leavesService.changeStatusCONFIRM(leaves.id);

      return ResponseFormat(true, 200, "OK", data);

    } catch (error) {
      // در صورت بروز خطا، پاسخ خطا به کاربر ارسال می‌شود
      console.log(error)
      return ResponseFormat(false, 500, "SERVER-ERROR", null);
    }
  }

  @ApiBearerAuth('BearerAuth')
  @Post('/reject')
  async rejectStatusLeaves(@Body() leaves: ChangeStatusDto) {
    try {
      const data = await this.leavesService.changeStatusREJECT(leaves.id);

      return ResponseFormat(true, 200, "OK", data);

    } catch (error) {
      // در صورت بروز خطا، پاسخ خطا به کاربر ارسال می‌شود
      console.log(error)
      return ResponseFormat(false, 500, "SERVER-ERROR", null);
    }
  }

  // حذف یک مرخصی براساس شناسه
  // @ApiBearerAuth('BearerAuth')
  // @Delete(':id')
  // async remove(@Param('id') id: string) {
  //   try {
  //     const data = await this.leavesService.remove(+id);
  //     return ResponseFormat(true, 200, "OK", data);

  //   } catch (error) {
  //     // در صورت بروز خطا، پاسخ خطا به کاربر ارسال می‌شود
  //     return ResponseFormat(false, 500, "SERVER-ERROR", null);
  //   }
  // }
}
