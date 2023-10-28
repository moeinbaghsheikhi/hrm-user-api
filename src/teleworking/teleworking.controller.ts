import { Controller, Get, Post, Body, Patch, Param, Delete, Request } from '@nestjs/common';
import { TeleworkingService } from './teleworking.service';
import { CreateTeleworkingDto } from './dto/create-teleworking.dto';
import { UpdateTeleworkingDto } from './dto/update-teleworking.dto';
import ResponseFormat, { ResponseFormatType } from 'src/utils/Addons/response-formats';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FilterParamsDto } from 'src/public/dto/get-by-filter.dto';
import { ChangeStatusDto } from 'src/public/dto/change-status.dto';

@ApiTags('teleworking - درخواست دورکاری')
@Controller('teleworking')
export class TeleworkingController {
  constructor(private readonly teleworkingService: TeleworkingService) { }

  @ApiBearerAuth('BearerAuth')
  @Post()
  async create(@Request() req, @Body() createTeleworkingDto: CreateTeleworkingDto) {
    try {
      const data = await this.teleworkingService.create(req.user.id, createTeleworkingDto);
      return ResponseFormat(true, 200, "OK", data);

    } catch (error) {
      // در صورت بروز خطا، پاسخ خطا به کاربر ارسال می‌شود
      return ResponseFormat(false, 500, "SERVER-ERROR", null);
    }
  }

  @ApiBearerAuth('BearerAuth')
  @Get()
  async findAll(@Request() req): Promise<ResponseFormatType> {
    try {
      const data = await this.teleworkingService.findAll(req.user.id);
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
      const data = await this.teleworkingService.findAllByFilter(filter, req.user.id);

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
    try {
      const data = await this.teleworkingService.findOne(+id);
      return ResponseFormat(true, 200, "OK", data);

    } catch (error) {
      // در صورت بروز خطا، پاسخ خطا به کاربر ارسال می‌شود
      return ResponseFormat(false, 500, "SERVER-ERROR", null);
    }
  }

  @ApiBearerAuth('BearerAuth')
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateTeleworkingDto: UpdateTeleworkingDto) {
    try {
      const data = await this.teleworkingService.update(+id, updateTeleworkingDto);
      return ResponseFormat(true, 200, "OK", data);

    } catch (error) {
      // در صورت بروز خطا، پاسخ خطا به کاربر ارسال می‌شود
      return ResponseFormat(false, 500, "SERVER-ERROR", null);
    }
  }

  @ApiBearerAuth('BearerAuth')
  @Post('/set')
  async setStatusteleworking(@Body() teleworking: ChangeStatusDto) {
    try {
      const data = await this.teleworkingService.changeStatusSET(teleworking.id);

      return ResponseFormat(true, 200, "OK", data);

    } catch (error) {
      // در صورت بروز خطا، پاسخ خطا به کاربر ارسال می‌شود
      console.log(error)
      return ResponseFormat(false, 500, "SERVER-ERROR", null);
    }
  }

  @ApiBearerAuth('BearerAuth')
  @Post('/confirm')
  async confirmStatusteleworking(@Body() teleworking: ChangeStatusDto) {
    try {
      const data = await this.teleworkingService.changeStatusCONFIRM(teleworking.id);

      return ResponseFormat(true, 200, "OK", data);

    } catch (error) {
      // در صورت بروز خطا، پاسخ خطا به کاربر ارسال می‌شود
      console.log(error)
      return ResponseFormat(false, 500, "SERVER-ERROR", null);
    }
  }

  @ApiBearerAuth('BearerAuth')
  @Post('/reject')
  async rejectStatusteleworking(@Body() teleworking: ChangeStatusDto) {
    try {
      const data = await this.teleworkingService.changeStatusREJECT(teleworking.id);

      return ResponseFormat(true, 200, "OK", data);

    } catch (error) {
      // در صورت بروز خطا، پاسخ خطا به کاربر ارسال می‌شود
      console.log(error)
      return ResponseFormat(false, 500, "SERVER-ERROR", null);
    }
  }

  // @ApiBearerAuth('BearerAuth')
  // @Delete(':id')
  // async remove(@Param('id') id: string) {
  //   try {
  //     const data = await this.teleworkingService.remove(+id);
  //     return ResponseFormat(true, 200, "OK", data);

  //   } catch (error) {
  //     // در صورت بروز خطا، پاسخ خطا به کاربر ارسال می‌شود
  //     return ResponseFormat(false, 500, "SERVER-ERROR", null);
  //   }
  // }
}
