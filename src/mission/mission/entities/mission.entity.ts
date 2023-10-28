import { MissionHistory } from 'src/mission/mission_history/entities/mission_history.entity';
import { MissionReport } from 'src/mission/mission_report/entities/mission_report.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import MissionStatus from '../enum/MissionStatusEnum';
import MissionType from '../enum/MissionTypeEnum';

@Entity('missions')
export class Mission {
  // شناسه ماموریت
  @PrimaryGeneratedColumn()
  id: number;

  // شناسه کاربر
  @Column({ type: 'integer' })
  user_id: number;

  // شناسه مدیر
  @Column({ type: 'integer' })
  manager_id: number;

  // شناسه پروژه (می‌تواند تهی باشد)
  @Column({ type: 'bigint', nullable: true })
  project_id: number;

  // تاریخچه‌های ماموریت
  @OneToMany(() => MissionHistory, (history) => history.mission)
  histories: MissionHistory;

  // گزارش‌های ماموریت
  @OneToMany(() => MissionReport, (report) => report.mission)
  reports: MissionReport;

  // نوع ماموریت
  @Column({ type: 'enum', enum: MissionType, default: MissionType.INTERNAL })
  type: MissionType;

  // مکان ماموریت (می‌تواند تهی باشد)
  @Column({ type: 'varchar', length: 255, nullable: true })
  place: string;

  // تاریخ شروع ماموریت (می‌تواند تهی باشد)
  @Column({ type: 'timestamp', nullable: true })
  from_date: Date;

  // تاریخ پایان ماموریت (می‌تواند تهی باشد)
  @Column({ type: 'timestamp', nullable: true })
  until_date: Date;

  // توضیحات ماموریت (می‌تواند تهی باشد)
  @Column({ type: 'varchar', length: 255, nullable: true })
  behest: string;

  // توضیحات مدیر ماموریت (می‌تواند تهی باشد)
  @Column({ type: 'text', nullable: true })
  manager_description: string;

  // کمیسیون ماموریت (می‌تواند تهی باشد)
  @Column({ type: 'integer', nullable: true })
  commission: number;

  // حقوق ماموریت (می‌تواند تهی باشد)
  @Column({ type: 'integer', nullable: true })
  salary: number;

  // وضعیت ماموریت
  @Column({ type: 'enum', enum: MissionStatus, default: MissionStatus.SET })
  status: MissionStatus;

  // تاریخ ایجاد ماموریت
  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  // تاریخ به‌روزرسانی ماموریت
  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
