import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { ExitAttendanceDto } from './dto/exit-attendance.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Attendance } from './entities/attendance.entity';
import { Repository } from 'typeorm';
import { FilterParamsDto } from 'src/public/dto/get-by-filter.dto';
import { QueryService } from 'src/helper/query.service';
import { UserService } from 'src/user/user.service';
import AttendanceStatus from './enum/AttendanceStatusEnum';

@Injectable()
export class AttendanceService {
  constructor(@InjectRepository(Attendance) private AttendanceRepository: Repository<Attendance>, private readonly queryService: QueryService, private userService: UserService) { }

  // ایجاد یک رکورد حضور و غیاب جدید
  create(user_id: number, createAttendanceDto: CreateAttendanceDto) {
    const attendance = this.AttendanceRepository.create({
      user_id,
      ...createAttendanceDto
    })
    return this.AttendanceRepository.save(attendance)
  }

  // بازیابی تمام رکوردهای حضور و غیاب
  async findAll(user_id: number) {
    const data = await this.AttendanceRepository.find({ where: { user_id } });

    return data;
  }

  async findLastRecord(user_id: number) {
    const data = await this.AttendanceRepository.findOne({
      where: { user_id },
      order: { id: 'DESC' },
    });

    return data;
  }

  async findAllByFilter(filter: FilterParamsDto, user_id: number) {
    const queryBuilder = this.queryService.createFilterQuery(this.AttendanceRepository, filter, "attendance", user_id);
    const data = await queryBuilder.getMany();
    // console.log(queryBuilder.getQueryAndParameters())
    // انتظار می‌رود که userService.findOne از نوع Promise باشد
    await Promise.all(data.map(async (element) => {
      const user = await this.userService.findOne(element['user_id']);
      element['user'] = user;
    }));
    return data;
  }

  // بازیابی یک رکورد حضور و غیاب بر اساس شناسه
  findOne(id: number) {
    return this.AttendanceRepository.findOneBy({ id })
  }

  // به‌روزرسانی یک رکورد حضور و غیاب بر اساس درخواست ارسالی
  async exit(id: number, end_time: ExitAttendanceDto) {
    return this.AttendanceRepository.update(id, { ...end_time, status: AttendanceStatus.SET })
  }

  async changeStatusSET(id: number) {
    const attendanceToUpdate = await this.AttendanceRepository.findOneByOrFail({ id });

    // اعمال تغییرات ارسالی به رکورد موجود
    return this.AttendanceRepository.update(id, { status: AttendanceStatus.SET })
  }

  async changeStatusUNFINISHED(id: number) {
    const attendanceToUpdate = await this.AttendanceRepository.findOneByOrFail({ id });

    // اعمال تغییرات ارسالی به رکورد موجود
    return this.AttendanceRepository.update(id, { status: AttendanceStatus.UNFINISHED })
  }

  async changeStatusABSENCE(id: number) {
    const attendanceToUpdate = await this.AttendanceRepository.findOneByOrFail({ id });

    // اعمال تغییرات ارسالی به رکورد موجود
    return this.AttendanceRepository.update(id, { status: AttendanceStatus.ABSENCE })
  }

  // حذف یک رکورد حضور و غیاب بر اساس شناسه
  remove(id: number) {
    return this.AttendanceRepository.delete(id)
  }
}
