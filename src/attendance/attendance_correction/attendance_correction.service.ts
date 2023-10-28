import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAttendanceCorrectionDto } from './dto/create-attendance_correction.dto';
import { UpdateAttendanceCorrectionDto } from './dto/update-attendance_correction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AttendanceCorrection } from './entities/attendance_correction.entity';
import { Attendance } from '../attendance/entities/attendance.entity';
import { FilterParamsDto } from 'src/public/dto/get-by-filter.dto';
import { QueryService } from 'src/helper/query.service';
import { UserService } from 'src/user/user.service';
import AttendanceCorrectionStatus from './enum/AttendanceCorrectionStatusEnum';

@Injectable()
export class AttendanceCorrectionService {
  constructor(
    @InjectRepository(AttendanceCorrection) private AttendanceCorrectionRepository: Repository<AttendanceCorrection>,
    @InjectRepository(Attendance) private AttendanceRepository: Repository<Attendance>,
    private readonly queryService: QueryService, private userService: UserService
  ) { }

  // تابع برای ایجاد درخواست ویرایش مرخصی
  async create(user_id: number, createAttendanceCorrectionDto: CreateAttendanceCorrectionDto, attendance) {
    // ایجاد یک درخواست ویرایش مرخصی جدید با استفاده از اطلاعات ارسالی و مرخصی یافته شده
    const attendance_corr = this.AttendanceCorrectionRepository.create({
      user_id,
      ...createAttendanceCorrectionDto,
      attendance
    })
    return this.AttendanceCorrectionRepository.save(attendance_corr)
  }

  // بازیابی تمام رکوردهای حضور و غیاب
  async findAll(user_id: number) {
    const data = await this.AttendanceCorrectionRepository.find({ where: { user_id } });

    return data;
  }


  // بازیابی تمام رکوردهای حضور و غیاب
  async findAllByFilter(filter: FilterParamsDto, user_id: number) {
    const queryBuilder = this.queryService.createFilterQuery(this.AttendanceCorrectionRepository, filter, "attendance_correction", user_id)
      .leftJoinAndSelect('attendance_correction.attendance', 'attendances');
    const data = await queryBuilder.getMany();

    // انتظار می‌رود که userService.findOne از نوع Promise باشد
    await Promise.all(data.map(async (element) => {
      const user = await this.userService.findOne(element['attendance']['user_id']);
      element['user'] = user;
    }));
    return data;
  }

  // تابع برای گرفتن یک درخواست ویرایش مرخصی خاص بر اساس شناسه
  findOne(id: number) {
    return this.AttendanceCorrectionRepository.findOneBy({ id });
  }

  // تابع برای به‌روزرسانی یک درخواست ویرایش مرخصی
  update(id: number, updateRequest: UpdateAttendanceCorrectionDto) {
    return this.AttendanceCorrectionRepository.update({ id }, { ...updateRequest })
  }

  async changeStatusSET(id: number) {
    const attendanceCorrectionToUpdate = await this.AttendanceCorrectionRepository.findOneByOrFail({ id });

    // اعمال تغییرات ارسالی به رکورد موجود
    return this.AttendanceCorrectionRepository.update(id, { status: AttendanceCorrectionStatus.SET })
  }

  async changeStatusCONFIRM(id: number) {
    const attendanceCorrectionToUpdate = await this.AttendanceCorrectionRepository.findOneByOrFail({ id });

    // اعمال تغییرات ارسالی به رکورد موجود
    return this.AttendanceCorrectionRepository.update(id, { status: AttendanceCorrectionStatus.CONFIRM })
  }

  async changeStatusREJECT(id: number) {
    const attendanceCorrectionToUpdate = await this.AttendanceCorrectionRepository.findOneByOrFail({ id });

    // اعمال تغییرات ارسالی به رکورد موجود
    return this.AttendanceCorrectionRepository.update(id, { status: AttendanceCorrectionStatus.REJECT })
  }

  // تابع برای حذف یک درخواست ویرایش مرخصی بر اساس شناسه
  remove(id: number) {
    return this.AttendanceCorrectionRepository.delete(id)
  }
}
