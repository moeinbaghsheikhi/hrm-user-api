import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Request } from '@nestjs/common';
import ResponseFormat, { ResponseFormatType } from 'src/utils/Addons/response-formats';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { MissionHistoryService } from './mission_history.service';
import { CreateMissionHistoryDto } from './dto/create-mission_history.dto';
import { UpdateMissionHistoryDto } from './dto/update-mission_history.dto';

@ApiTags('missionHistory - تاریخچه ماموریت')
@Controller('missionHistory')
export class MissionHistoryController {
  constructor(private readonly missionHistoryService: MissionHistoryService) { }

  @ApiBearerAuth('BearerAuth')
  @Post()
  async create(@Request() req, @Body() createMissionHistoryDto: CreateMissionHistoryDto) {
    try {
      const data = await this.missionHistoryService.create(req.user.id, createMissionHistoryDto);
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
      const data = await this.missionHistoryService.remove(id);
      return ResponseFormat(true, 200, "OK", data);

    } catch (error) {
      // در صورت بروز خطا، پاسخ خطا به کاربر ارسال می‌شود
      return ResponseFormat(false, 500, "SERVER-ERROR", null);
    }
  }
}
