import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Request } from '@nestjs/common';
import { MissionService } from './mission.service';
import { CreateMissionDto } from './dto/create-mission.dto';
import { UpdateMissionDto } from './dto/update-mission.dto';
import { firstValueFrom } from 'rxjs';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import ResponseFormat, { ResponseFormatType } from 'src/utils/Addons/response-formats';
import { FilterParamsDto } from 'src/public/dto/get-by-filter.dto';
import { ChangeStatusDto } from 'src/public/dto/change-status.dto';

@ApiTags('mission - ماموریت ها')
@Controller('mission')
export class MissionController {
  constructor(private readonly missionService: MissionService) { }

  // ایجاد ماموریت جدید
  @ApiBearerAuth('BearerAuth')
  @Post()
  async create(@Request() req, @Body() createMissionDto: CreateMissionDto) {
    try {
      const data = await this.missionService.create(req.user.id, createMissionDto);
      return ResponseFormat(true, 200, "OK", data);

    } catch (error) {
      // در صورت بروز خطا، پاسخ خطا به کاربر ارسال می‌شود
      return ResponseFormat(false, 500, "SERVER-ERROR", null);
    }
  }

  // دریافت همه‌ی اطلاعات ماموریت‌ها
  @ApiBearerAuth('BearerAuth')
  @Get()
  async findAll(@Request() req): Promise<ResponseFormatType> {
    try {
      const data = await this.missionService.findAll(req.user.id);
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
      const data = await this.missionService.findAllByFilter(filter, req.user.id);

      return ResponseFormat(true, 200, "OK", data);

    } catch (error) {
      // در صورت بروز خطا، پاسخ خطا به کاربر ارسال می‌شود
      console.log(error)
      return ResponseFormat(false, 500, "SERVER-ERROR", null);
    }
  }

  @ApiBearerAuth('BearerAuth')
  @Post('/set')
  async setStatusMission(@Body() mission: ChangeStatusDto) {
    try {
      const data = await this.missionService.changeStatusSET(mission.id);

      return ResponseFormat(true, 200, "OK", data);

    } catch (error) {
      // در صورت بروز خطا، پاسخ خطا به کاربر ارسال می‌شود
      console.log(error)
      return ResponseFormat(false, 500, "SERVER-ERROR", null);
    }
  }

  @ApiBearerAuth('BearerAuth')
  @Post('/confirm')
  async confirmStatusMission(@Body() mission: ChangeStatusDto) {
    try {
      const data = await this.missionService.changeStatusCONFIRM(mission.id);

      return ResponseFormat(true, 200, "OK", data);

    } catch (error) {
      // در صورت بروز خطا، پاسخ خطا به کاربر ارسال می‌شود
      console.log(error)
      return ResponseFormat(false, 500, "SERVER-ERROR", null);
    }
  }

  @ApiBearerAuth('BearerAuth')
  @Post('/reject')
  async rejectStatusMission(@Body() mission: ChangeStatusDto) {
    try {
      const data = await this.missionService.changeStatusREJECT(mission.id);

      return ResponseFormat(true, 200, "OK", data);

    } catch (error) {
      // در صورت بروز خطا، پاسخ خطا به کاربر ارسال می‌شود
      console.log(error)
      return ResponseFormat(false, 500, "SERVER-ERROR", null);
    }
  }

  @ApiBearerAuth('BearerAuth')
  @Post('/done')
  async doneStatusMission(@Body() mission: ChangeStatusDto) {
    try {
      const data = await this.missionService.changeStatusDONE(mission.id);

      return ResponseFormat(true, 200, "OK", data);

    } catch (error) {
      // در صورت بروز خطا، پاسخ خطا به کاربر ارسال می‌شود
      console.log(error)
      return ResponseFormat(false, 500, "SERVER-ERROR", null);
    }
  }

  @ApiBearerAuth('BearerAuth')
  @Post('/doneReject')
  async doneRejectStatusMission(@Body() mission: ChangeStatusDto) {
    try {
      const data = await this.missionService.changeStatusDONE_REJECT(mission.id);

      return ResponseFormat(true, 200, "OK", data);

    } catch (error) {
      // در صورت بروز خطا، پاسخ خطا به کاربر ارسال می‌شود
      console.log(error)
      return ResponseFormat(false, 500, "SERVER-ERROR", null);
    }
  }

  @ApiBearerAuth('BearerAuth')
  @Post('/doneConfirm')
  async doneConfirmStatusMission(@Body() mission: ChangeStatusDto) {
    try {
      const data = await this.missionService.changeStatusDONE_CONFIRM(mission.id);

      return ResponseFormat(true, 200, "OK", data);

    } catch (error) {
      // در صورت بروز خطا، پاسخ خطا به کاربر ارسال می‌شود
      console.log(error)
      return ResponseFormat(false, 500, "SERVER-ERROR", null);
    }
  }

  // دریافت اطلاعات ماموریت بر اساس شناسه
  @ApiBearerAuth('BearerAuth')
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<ResponseFormatType> {
    try {
      const data = await this.missionService.findOne(id);
      return ResponseFormat(true, 200, "OK", data);

    } catch (error) {
      // در صورت بروز خطا، پاسخ خطا به کاربر ارسال می‌شود
      return ResponseFormat(false, 500, "SERVER-ERROR", null);
    }
  }

  // به‌روزرسانی اطلاعات ماموریت بر اساس شناسه
  @ApiBearerAuth('BearerAuth')
  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateMissionDto: UpdateMissionDto) {
    try {
      const data = await this.missionService.update(id, updateMissionDto);
      return ResponseFormat(true, 200, "OK", data);

    } catch (error) {
      // در صورت بروز خطا، پاسخ خطا به کاربر ارسال می‌شود
      return ResponseFormat(false, 500, "SERVER-ERROR", null);
    }
  }


  // حذف اطلاعات ماموریت بر اساس شناسه
  // @ApiBearerAuth('BearerAuth')
  // @Delete(':id')
  // async remove(@Param('id', ParseIntPipe) id: number) {
  //   try {
  //     const data = await this.missionService.remove(id);
  //     return ResponseFormat(true, 200, "OK", data);

  //   } catch (error) {
  //     // در صورت بروز خطا، پاسخ خطا به کاربر ارسال می‌شود
  //     return ResponseFormat(false, 500, "SERVER-ERROR",null);
  //   }
  // }

  @ApiBearerAuth('BearerAuth')
  @Post()
  async updaateSet(@Request() req, @Body() createMissionDto: CreateMissionDto) {
    try {
      const data = await this.missionService.create(req.user.id, createMissionDto);
      return ResponseFormat(true, 200, "OK", data);

    } catch (error) {
      // در صورت بروز خطا، پاسخ خطا به کاربر ارسال می‌شود
      return ResponseFormat(false, 500, "SERVER-ERROR", null);
    }
  }
}
