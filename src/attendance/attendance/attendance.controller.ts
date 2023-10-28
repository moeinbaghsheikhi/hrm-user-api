import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Request } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { ExitAttendanceDto } from './dto/exit-attendance.dto';
import ResponseFormat, { ResponseFormatType } from '../../utils/Addons/response-formats';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Attendance } from './entities/attendance.entity';
import { FilterParamsDto } from 'src/public/dto/get-by-filter.dto';
import { ChangeStatusDto } from 'src/public/dto/change-status.dto';

@ApiTags('attendance - حضور غیاب ها')
@Controller('attendance')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) { }

  // ایجاد حضور و غیاب جدید
  @ApiBearerAuth('BearerAuth')
  @Post('register')
  async create(@Request() req, @Body() createAttendanceDto: CreateAttendanceDto) {
    try {
      const data = await this.attendanceService.create(req.user.id, createAttendanceDto);
      return ResponseFormat(true, 200, "OK", data);

    } catch (error) {
      // در صورت بروز خطا، پاسخ خطا به کاربر ارسال می‌شود
      return ResponseFormat(false, 500, "SERVER-ERROR", null);
    }
  }

  // دریافت همه‌ی اطلاعات حضور و غیاب
  @ApiBearerAuth('BearerAuth')
  @Get()
  async findAll(@Request() req) {
    try {
      const data = await this.attendanceService.findAll(req.user.id);

      return ResponseFormat(true, 200, "OK", data);

    } catch (error) {
      // در صورت بروز خطا، پاسخ خطا به کاربر ارسال می‌شود
      return ResponseFormat(false, 500, "SERVER-ERROR", null);
    }
  }

  @ApiBearerAuth('BearerAuth')
  @Get('findLastRecord')
  async findLastRecord(@Request() req) {
    try {
      const data = await this.attendanceService.findLastRecord(req.user.id);

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
      const data = await this.attendanceService.findAllByFilter(filter, req.user.id);

      return ResponseFormat(true, 200, "OK", data);

    } catch (error) {
      // در صورت بروز خطا، پاسخ خطا به کاربر ارسال می‌شود
      console.log(error)
      return ResponseFormat(false, 500, "SERVER-ERROR", null);
    }
  }

  // دریافت اطلاعات حضور و غیاب بر اساس شناسه
  @ApiBearerAuth('BearerAuth')
  @Get(':id')
  async findOne(@Param('id') id: number) {
    try {
      const data = await this.attendanceService.findOne(+id);

      if (!data) return ResponseFormat(true, 204, "NOT-FOUND", data)
      return ResponseFormat(true, 200, "OK", data);

    } catch (error) {
      // در صورت بروز خطا، پاسخ خطا به کاربر ارسال می‌شود
      return ResponseFormat(false, 500, "SERVER-ERROR", null);
    }
  }

  // به‌روزرسانی اطلاعات حضور و غیاب بر اساس شناسه
  @ApiBearerAuth('BearerAuth')
  @Patch('exit/:id')
  async exit(@Request() req, @Body() exitAttendanceDto: ExitAttendanceDto) {
    try {
      const user = await this.attendanceService.findLastRecord(req.user.id)
      await this.attendanceService.exit(user.id, exitAttendanceDto);
      const attendance = await this.attendanceService.findOne(user.id)
      if (!attendance) return ResponseFormat(false, 204, "NOT-FOUND", null)
      return ResponseFormat(true, 200, "OK", attendance);

    } catch (error) {
      // در صورت بروز خطا، پاسخ خطا به کاربر ارسال می‌شود
      return ResponseFormat(false, 500, "SERVER-ERROR", null);
    }
  }

  @ApiBearerAuth('BearerAuth')
  @Post('/set')
  async setStatusAttendance(@Body() attendance: ChangeStatusDto) {
    try {
      const data = await this.attendanceService.changeStatusSET(attendance.id);

      return ResponseFormat(true, 200, "OK", data);

    } catch (error) {
      // در صورت بروز خطا، پاسخ خطا به کاربر ارسال می‌شود
      console.log(error)
      return ResponseFormat(false, 500, "SERVER-ERROR", null);
    }
  }

  @ApiBearerAuth('BearerAuth')
  @Post('/absence')
  async absenceStatusAttendance(@Body() attendance: ChangeStatusDto) {
    try {
      const data = await this.attendanceService.changeStatusABSENCE(attendance.id);

      return ResponseFormat(true, 200, "OK", data);

    } catch (error) {
      // در صورت بروز خطا، پاسخ خطا به کاربر ارسال می‌شود
      console.log(error)
      return ResponseFormat(false, 500, "SERVER-ERROR", null);
    }
  }

  @ApiBearerAuth('BearerAuth')
  @Post('/unfinished')
  async unfinishedStatusAttendance(@Body() attendance: ChangeStatusDto) {
    try {
      const data = await this.attendanceService.changeStatusUNFINISHED(attendance.id);

      return ResponseFormat(true, 200, "OK", data);

    } catch (error) {
      // در صورت بروز خطا، پاسخ خطا به کاربر ارسال می‌شود
      console.log(error)
      return ResponseFormat(false, 500, "SERVER-ERROR", null);
    }
  }

  // حذف اطلاعات حضور و غیاب بر اساس شناسه
  // @ApiBearerAuth('BearerAuth')
  // @Delete(':id')
  // async remove(@Param('id') id: number) {
  //   try {
  //     const data = await this.attendanceService.remove(+id);
  //     return ResponseFormat(true, 200, "OK", data);

  //   } catch (error) {
  //     // در صورت بروز خطا، پاسخ خطا به کاربر ارسال می‌شود
  //     return ResponseFormat(false, 500, "SERVER-ERROR", null);
  //   }
  // }
}