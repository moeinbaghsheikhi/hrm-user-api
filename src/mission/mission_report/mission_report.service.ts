import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateMissionReportDto } from './dto/create-mission_report.dto';
import { UpdateMissionReportDto } from './dto/update-mission_report.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MissionReport } from './entities/mission_report.entity';
import { Mission } from '../mission/entities/mission.entity';

@Injectable()
export class MissionReportService {
  constructor(
    @InjectRepository(MissionReport) private missionReportRepository: Repository<MissionReport>,
    @InjectRepository(Mission) private missionRepository: Repository<Mission>
  ) { }

  /**
   * ایجاد یک گزارش ماموریت جدید
   * @param createMissionReportDto اطلاعات مورد نیاز برای ایجاد گزارش ماموریت
   * @returns گزارش ماموریت ایجاد شده
   */
  async create(createMissionReportDto: CreateMissionReportDto) {
    const mission = await this.missionRepository.findOneByOrFail({ id: createMissionReportDto.mission });

    const newReport = this.missionReportRepository.create({
      ...createMissionReportDto,
      mission,
    });

    return this.missionReportRepository.save(newReport);
  }

  /**
   * حذف یک گزارش ماموریت بر اساس شناسه
   * @param id شناسه گزارش ماموریت مورد نظر برای حذف
   * @returns نتیجه حذف
   */
  remove(id: number) {
    return this.missionReportRepository.delete(id);
  }
}
