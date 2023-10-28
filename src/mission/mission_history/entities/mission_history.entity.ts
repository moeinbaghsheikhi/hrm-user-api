import { Mission } from 'src/mission/mission/entities/mission.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  ManyToOne,
} from 'typeorm';

@Entity('mission_history')
export class MissionHistory {
  @PrimaryGeneratedColumn()
  id: number;

  // تعیین رابطه با ماموریت مرتبط
  @ManyToOne(() => Mission, (mission) => mission.histories)
  mission: Mission;

  // شناسه کاربری که تاریخچه را ایجاد کرده است
  @Column({ type: 'integer' })
  user_id: number;

  // عملیات انجام شده در تاریخچه (مثلاً "ویرایش" یا "حذف")
  @Column()
  action: string;

  // تاریخ ایجاد تاریخچه
  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
