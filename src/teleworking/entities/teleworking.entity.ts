import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import TeleworkingStatus from "../enum/TeleworkingStatusEnum";

@Entity({ name: 'teleworkings' })
export class Teleworking {
    @PrimaryGeneratedColumn()
    id: number; // شناسه سابقه دورکاری

    @Column()
    user_id: number; // شناسه کاربر

    @Column()
    from_date: Date; // تاریخ شروع دورکاری 

    @Column()
    until_date: Date; // تاریخ پایان دورکاری 

    @Column()
    description: string; // توضیحات دورکاری

    @Column()
    manager_id: number; // شناسه مدیر

    @Column({ nullable: true })
    manager_from_date: Date; // تاریخ شروع دورکاری تایید شده توسط مدیر (اختیاری)

    @Column({ nullable: true })
    manager_until_date: Date; // تاریخ پایان دورکاری تایید شده توسط مدیر (اختیاری)

    @Column()
    manager_description: string; // توضیحات دورکاری مدیر

    @Column()
    project: number; // شناسه پروژه

    @Column({ type: 'enum', enum: TeleworkingStatus, default: TeleworkingStatus.SET })
    status: TeleworkingStatus; // وضعیت دورکاری
}