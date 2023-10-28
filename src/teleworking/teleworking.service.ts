import { Injectable } from '@nestjs/common';
import { CreateTeleworkingDto } from './dto/create-teleworking.dto';
import { UpdateTeleworkingDto } from './dto/update-teleworking.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Teleworking } from './entities/teleworking.entity';
import { Repository } from 'typeorm';
import { QueryService } from 'src/helper/query.service';
import { FilterParamsDto } from 'src/public/dto/get-by-filter.dto';
import { UserService } from 'src/user/user.service';
import TeleworkingStatus from './enum/TeleworkingStatusEnum';

@Injectable()
export class TeleworkingService {
  constructor(
    @InjectRepository(Teleworking) private teleworkingRepository: Repository<Teleworking>, private readonly queryService: QueryService, private userService: UserService
  ) { }

  /**
   * ایجاد یک سابقه دورکاری جدید
   * @param createTeleworkingDto اطلاعات موردنیاز برای ایجاد سابقه دورکاری
   * @returns سابقه دورکاری ایجاد شده
   */
  async create(user_id: number, createTeleworkingDto: CreateTeleworkingDto) {
    const teleworking = await this.teleworkingRepository.create({ user_id, ...createTeleworkingDto });
    return this.teleworkingRepository.save(teleworking);
  }

  /**
   * دریافت تمامی سوابق دورکاری
   * @returns لیستی از تمامی سوابق دورکاری
   */
  async findAll(user_id: number) {
    return this.teleworkingRepository.find({ where: { user_id } });
  }

  async findAllByFilter(filter: FilterParamsDto, user_id: number) {
    const queryBuilder = this.queryService.createFilterQuery(this.teleworkingRepository, filter, "teleworkings", user_id);
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
   * دریافت یک سابقه دورکاری بر اساس شناسه
   * @param id شناسه سابقه دورکاری مورد نظر
   * @returns سابقه دورکاری موردنظر
   */
  findOne(id: number) {
    return this.teleworkingRepository.findOneBy({ id });
  }

  /**
   * به‌روزرسانی یک سابقه دورکاری
   * @param updateTeleworkingDto اطلاعات جدید برای به‌روزرسانی سابقه دورکاری
   * @returns سابقه دورکاری به‌روزرسانی شده
   */
  update(id: number, updateTeleworkingDto: UpdateTeleworkingDto) {
    return this.teleworkingRepository.update({ id }, { ...updateTeleworkingDto });
  }

  async changeStatusSET(id: number) {
    const attendanceCorrectionToUpdate = await this.teleworkingRepository.findOneByOrFail({ id });

    // اعمال تغییرات ارسالی به رکورد موجود
    return this.teleworkingRepository.update(id, { status: TeleworkingStatus.SET })
  }

  async changeStatusCONFIRM(id: number) {
    const attendanceCorrectionToUpdate = await this.teleworkingRepository.findOneByOrFail({ id });

    // اعمال تغییرات ارسالی به رکورد موجود
    return this.teleworkingRepository.update(id, { status: TeleworkingStatus.CONFIRM })
  }

  async changeStatusREJECT(id: number) {
    const attendanceCorrectionToUpdate = await this.teleworkingRepository.findOneByOrFail({ id });

    // اعمال تغییرات ارسالی به رکورد موجود
    return this.teleworkingRepository.update(id, { status: TeleworkingStatus.REJECT })
  }


  /**
   * حذف یک سابقه دورکاری بر اساس شناسه
   * @param id شناسه سابقه دورکاری مورد نظر برای حذف
   * @returns نتیجه حذف
   */
  remove(id: number) {
    return this.teleworkingRepository.delete(id);
  }
}
