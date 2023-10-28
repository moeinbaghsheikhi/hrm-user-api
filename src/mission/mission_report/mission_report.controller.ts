import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import ResponseFormat, { ResponseFormatType } from 'src/utils/Addons/response-formats';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { MissionReportService } from './mission_report.service';
import { CreateMissionReportDto } from './dto/create-mission_report.dto';
import { UpdateMissionReportDto } from './dto/update-mission_report.dto';

@ApiTags('missionReport - گزارش ماموریت')

@Controller('missionReport')
export class MissionReportController {
  constructor(private readonly missionReportService: MissionReportService) { }

  @ApiBearerAuth('BearerAuth')
  @Post()
  async create(@Body() createMissionReportDto: CreateMissionReportDto) {
    try {
      const data = await this.missionReportService.create(createMissionReportDto);
      return ResponseFormat(true, 200, "OK", data);

    } catch (error) {
      // در صورت بروز خطا، پاسخ خطا به کاربر ارسال می‌شود
      return ResponseFormat(false, 500, "SERVER-ERROR", null);
    }
  }

  // حذف اطلاعات ماموریت بر اساس شناسه
  @ApiBearerAuth('BearerAuth')
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    try {
      const data = await this.missionReportService.remove(id);
      return ResponseFormat(true, 200, "OK", data);

    } catch (error) {
      // در صورت بروز خطا، پاسخ خطا به کاربر ارسال می‌شود
      return ResponseFormat(false, 500, "SERVER-ERROR", null);
    }
  }
}
