import { Attendance } from "src/attendance/attendance/entities/attendance.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn } from 'typeorm';
import AttendanceCorrectionStatus from "../enum/AttendanceCorrectionStatusEnum";

@Entity({ name: 'attendance_correction' })
export class AttendanceCorrection {
    // شناسه درخواست ویرایش مرخصی
    @PrimaryGeneratedColumn()
    id: number;

    // تاریخ درخواست (می‌تواند تهی باشد)
    @Column({nullable: true})
    date: Date;

    @Column({nullable: true})
    description: string;

    // زمان شروع (می‌تواند تهی باشد)
    @Column({nullable: true})
    start_time: Date;

    // زمان پایان (می‌تواند تهی باشد)
    @Column({nullable: true})
    end_time: Date;

    // وضعیت درخواست ویرایش مرخصی (می‌تواند تهی باشد)
    @Column({ type: 'enum', enum: AttendanceCorrectionStatus, default: AttendanceCorrectionStatus.SET })
    status: AttendanceCorrectionStatus;

    // ارتباط با جدول حضور و غیاب (Attendance)
    @ManyToOne(() => Attendance, (attendance) => attendance.attendance_correction)
    attendance: Attendance;

    // آیدی کاربر
    @Column({default: 1})
    user_id: number;

    // تاریخ ایجاد درخواست ویرایش مرخصی
    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    createdAt: Date;

    // تاریخ به‌روزرسانی درخواست ویرایش مرخصی
    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt: Date;
}