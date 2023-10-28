import { Module } from '@nestjs/common';
import { MissionReportService } from './mission_report.service';
import { MissionReportController } from './mission_report.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mission } from '../mission/entities/mission.entity';
import { MissionReport } from './entities/mission_report.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Mission, MissionReport])],
  controllers: [MissionReportController],
  providers: [MissionReportService],
})
export class MissionReportModule {}
