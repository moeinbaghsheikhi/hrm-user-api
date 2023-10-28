import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateMissionDto } from './dto/create-mission.dto';
import { UpdateMissionDto } from './dto/update-mission.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Mission } from './entities/mission.entity';
import { Repository } from 'typeorm';
import { QueryService } from 'src/helper/query.service';
import { FilterParamsDto } from 'src/public/dto/get-by-filter.dto';
import { UserService } from 'src/user/user.service';
import MissionStatus from './enum/MissionStatusEnum';

@Injectable()
export class MissionService {
  constructor(@InjectRepository(Mission) private missionRepository: Repository<Mission>, private readonly queryService: QueryService, private userService: UserService) { }

  /**
   * ایجاد یک ماموریت جدید
   * @param createMissionDto اطلاعات مورد نیاز برای ایجاد ماموریت
   * @returns ماموریت ایجاد شده
   */
  create(user_id: number, createMissionDto: CreateMissionDto) {
    const newMission = this.missionRepository.create({
      user_id,
      ...createMissionDto
    });

    return this.missionRepository.save(newMission);
  }

  /**
   * دریافت تمامی ماموریت‌ها به همراه تاریخچه و گزارش‌ها
   * @returns لیست تمامی ماموریت‌ها
   */
  async findAll(user_id: number) {
    return await this.missionRepository.find({ where: { user_id } });
  }

  async findAllByFilter(filter: FilterParamsDto, user_id: number) {
    const queryBuilder = this.queryService.createFilterQuery(this.missionRepository, filter, "missions", user_id);
    const data = await queryBuilder.getMany();

    // انتظار می‌رود که userService.findOne از نوع Promise باشد
    await Promise.all(data.map(async (element) => {
      const user = await this.userService.findOne(element['user_id']);
      if (user) element['user'] = user;

      // getManager
      const manager = await this.userService.findOne(element['manager_id']);
      if (manager) element['manager'] = manager;
    }));
    return data;
  }

  /**
   * دریافت یک ماموریت بر اساس شناسه
   * @param id شناسه ماموریت مورد نظر
   * @returns ماموریت موردنظر
   */
  findOne(id: number) {
    return this.missionRepository.findOne({ relations: ['reports', 'histories'], where: { id } })
  }

  /**
   * به‌روزرسانی یک ماموریت
   * @param updateRequest اطلاعات جدید برای به‌روزرسانی ماموریت
   * @returns ماموریت به‌روزرسانی شده
   */
  async update(id: number, updateRequest: UpdateMissionDto) {
    const missionToUpdate = await this.missionRepository.findOneByOrFail({ id });

    // اعمال تغییرات ارسالی به رکورد موجود
    return this.missionRepository.update(id, updateRequest)
  }

  async changeStatusSET(id: number) {
    const attendanceCorrectionToUpdate = await this.missionRepository.findOneByOrFail({ id });

    // اعمال تغییرات ارسالی به رکورد موجود
    return this.missionRepository.update(id, { status: MissionStatus.SET })
  }

  async changeStatusCONFIRM(id: number) {
    const attendanceCorrectionToUpdate = await this.missionRepository.findOneByOrFail({ id });

    // اعمال تغییرات ارسالی به رکورد موجود
    return this.missionRepository.update(id, { status: MissionStatus.CONFIRM })
  }

  async changeStatusREJECT(id: number) {
    const attendanceCorrectionToUpdate = await this.missionRepository.findOneByOrFail({ id });

    // اعمال تغییرات ارسالی به رکورد موجود
    return this.missionRepository.update(id, { status: MissionStatus.REJECT })
  }

  async changeStatusDONE(id: number) {
    const attendanceCorrectionToUpdate = await this.missionRepository.findOneByOrFail({ id });

    // اعمال تغییرات ارسالی به رکورد موجود
    return this.missionRepository.update(id, { status: MissionStatus.DONE })
  }

  async changeStatusDONE_CONFIRM(id: number) {
    const attendanceCorrectionToUpdate = await this.missionRepository.findOneByOrFail({ id });

    // اعمال تغییرات ارسالی به رکورد موجود
    return this.missionRepository.update(id, { status: MissionStatus.DONE_CONFIRM })
  }

  async changeStatusDONE_REJECT(id: number) {
    const attendanceCorrectionToUpdate = await this.missionRepository.findOneByOrFail({ id });

    // اعمال تغییرات ارسالی به رکورد موجود
    return this.missionRepository.update(id, { status: MissionStatus.DONE_REJECT })
  }

  /**
   * حذف یک ماموریت بر اساس شناسه
   * @param id شناسه ماموریت مورد نظر برای حذف
   * @returns نتیجه حذف
   */
  async remove(id: number) {
    const missionToRemove = await this.missionRepository.findOneByOrFail({ id });

    return this.missionRepository.remove(missionToRemove);
  }
}
