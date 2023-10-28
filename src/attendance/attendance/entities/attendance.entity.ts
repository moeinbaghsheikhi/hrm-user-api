import { AttendanceCorrection } from "src/attendance/attendance_correction/entities/attendance_correction.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import AttendanceStatus from '../enum/AttendanceStatusEnum';
import AttendanceType from '../enum/AttendanceTypeEnum';

@Entity({ name: 'attendances' })
export class Attendance {
    // شناسه حضور و غیاب
    @PrimaryGeneratedColumn()
    id: number;

    // شناسه کاربر مرتبط با این رکورد حضور و غیاب (در صورت وجود)
    @Column({ nullable: true })
    user_id: number;

    // تاریخ حضور و غیاب (در صورت وجود)
    @Column({ nullable: true })
    date: Date;

    // زمان شروع حضور (در صورت وجود)
    @Column({ nullable: true })
    start_time: Date;

    // زمان پایان حضور (در صورت وجود)
    @Column({ nullable: true })
    end_time: Date;

    // نوع تردد
    @Column({ type: 'enum', enum: AttendanceType, default: AttendanceType.DEVICE })
    type: AttendanceType;
    
    // وضعیت حضور و غیاب (برای مثال: حاضر یا غایب)
    @Column({ type: 'enum', enum: AttendanceStatus, default: AttendanceStatus.UNFINISHED })
    status: AttendanceStatus;

    // ارتباط با جدول حضور و غیاب اصلاحی (در صورت وجود یک یا چند رکورد)
    @OneToMany(() => AttendanceCorrection, (attendanceCorrection) => attendanceCorrection.attendance)
    @JoinColumn()
    attendance_correction: AttendanceCorrection[];

    // تاریخ ایجاد رکورد حضور و غیاب
    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    createdAt: Date;
  
    // تاریخ به‌روزرسانی رکورد حضور و غیاب
    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt: Date;
}
