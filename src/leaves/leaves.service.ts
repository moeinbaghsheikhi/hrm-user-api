import { Injectable } from '@nestjs/common';
import { CreateLeavesDto } from './dto/create-leaves.dto';
import { UpdateleavesDto } from './dto/update-leaves.dto';
import { Leaves } from './entities/leaves.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { FilterParamsDto } from 'src/public/dto/get-by-filter.dto';
import { QueryService } from 'src/helper/query.service';
import { UserService } from 'src/user/user.service';
import LeavesStatus from './enum/LeavesStatusEnum';

@Injectable()
export class LeavesService {
  constructor(
    @InjectRepository(Leaves) private leavesRepository: Repository<Leaves>,
    private readonly queryService: QueryService, private userService: UserService
  ) { }

  /**
   * ایجاد یک رکورد جدید برای مرخصی
   * @param createLeavesDto اطلاعات مورد نیاز برای ایجاد مرخصی
   * @returns مرخصی ایجاد شده
   */
  create(user_id: number, createLeavesDto: CreateLeavesDto) {
    const leaves = this.leavesRepository.create({ user_id, ...createLeavesDto })
    return this.leavesRepository.save(leaves)
  }

  /**
   * دریافت تمامی مرخصی‌ها
   * @returns لیستی از تمامی مرخصی‌ها
   */
  findAll(user_id: number) {
    return this.leavesRepository.find({ where: { user_id } });
  }

  async findAllByFilter(user_id: number, filter: FilterParamsDto) {
    const queryBuilder = this.queryService.createFilterQuery(this.leavesRepository, filter, "leaves", user_id);
    const data = await queryBuilder.getMany();

    // انتظار می‌رود که userService.findOne از نوع Promise باشد
    await Promise.all(data.map(async (element) => {
      const user = await this.userService.findOne(element['user_id']);
      element['user'] = user;
      // getManager
      const manager = await this.userService.findOne(element['manager_id']);
      if (manager) element['manager'] = manager;
    }));
    return data;
  }

  /**
   * دریافت یک مرخصی بر اساس شناسه
   * @param id شناسه مرخصی مورد نظر
   * @returns مرخصی موردنظر
   */
  findOne(id: number) {
    return this.leavesRepository.findOneBy({ id });
  }

  /**
   * به‌روزرسانی یک مرخصی
   * @param updateLeavesDto اطلاعات جدید برای به‌روزرسانی مرخصی
   * @returns مرخصی به‌روزرسانی شده
   */
  update(id: number, updateLeavesDto: UpdateleavesDto) {
    return this.leavesRepository.update(id, updateLeavesDto);
  }

  async changeStatusSET(id: number) {
    const attendanceCorrectionToUpdate = await this.leavesRepository.findOneByOrFail({ id });

    // اعمال تغییرات ارسالی به رکورد موجود
    return this.leavesRepository.update(id, { status: LeavesStatus.SET })
  }

  async changeStatusCONFIRM(id: number) {
    const attendanceCorrectionToUpdate = await this.leavesRepository.findOneByOrFail({ id });

    // اعمال تغییرات ارسالی به رکورد موجود
    return this.leavesRepository.update(id, { status: LeavesStatus.CONFIRM })
  }

  async changeStatusREJECT(id: number) {
    const attendanceCorrectionToUpdate = await this.leavesRepository.findOneByOrFail({ id });

    // اعمال تغییرات ارسالی به رکورد موجود
    return this.leavesRepository.update(id, { status: LeavesStatus.REJECT })
  }

  /**
   * حذف یک مرخصی بر اساس شناسه
   * @param id شناسه مرخصی مورد نظر برای حذف
   * @returns نتیجه حذف
   */
  remove(id: number) {
    return this.leavesRepository.delete(id);
  }
}
