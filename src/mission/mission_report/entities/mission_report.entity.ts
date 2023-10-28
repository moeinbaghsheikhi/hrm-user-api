import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne } from 'typeorm';
import { Mission } from '../../mission/entities/mission.entity';

@Entity()
export class MissionReport {
  @PrimaryGeneratedColumn()
  id: number; // شناسه یکتا برای گزارش ماموریت

  @ManyToOne(() => Mission, (mission) => mission.reports)
  mission: Mission; // ماموریت مرتبط با این گزارش

  @Column()
  start_time: Date; // زمان شروع ماموریت مرتبط با این گزارش

  @Column()
  end_time: Date; // زمان پایان ماموریت مرتبط با این گزارش

  @Column({ type: 'text', nullable: true })
  comment: string; // نظرات و توضیحات مرتبط با این گزارش (قابلیت تهی بودن دارد)

  @CreateDateColumn({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
  createdAt: Date; // زمان ایجاد گزارش

  @UpdateDateColumn({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP'})
  updatedAt: Date; // زمان به‌روزرسانی گزارش
}
