import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateMissionHistoryDto } from './dto/create-mission_history.dto';
import { UpdateMissionHistoryDto } from './dto/update-mission_history.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MissionHistory } from './entities/mission_history.entity';
import { Mission } from '../mission/entities/mission.entity';

@Injectable()
export class MissionHistoryService {
  constructor(
    @InjectRepository(MissionHistory) private missionHistoryRepository: Repository<MissionHistory>,
    @InjectRepository(Mission) private missionRepository: Repository<Mission>
  ) { }

  /**
   * ایجاد یک تاریخچه جدید برای ماموریت
   * @param createMissionHistoryDto اطلاعات مورد نیاز برای ایجاد تاریخچه ماموریت
   * @returns تاریخچه ماموریت ایجاد شده
   */
  async create(user_id: number, createMissionHistoryDto: CreateMissionHistoryDto) {
    const mission = await this.missionRepository.findOneByOrFail({ id: createMissionHistoryDto.mission });

    const newHistory = this.missionHistoryRepository.create({
      user_id,
      ...createMissionHistoryDto,
      mission
    });
    return this.missionHistoryRepository.save(newHistory);
  }

  /**
   * حذف یک تاریخچه ماموریت بر اساس شناسه
   * @param id شناسه تاریخچه ماموریت مورد نظر برای حذف
   * @returns نتیجه حذف
   */
  remove(id: number) {
    return this.missionHistoryRepository.delete(id);
  }
}
