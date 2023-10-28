import { Module } from '@nestjs/common';
import { MissionHistoryService } from './mission_history.service';
import { MissionHistoryController } from './mission_history.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mission } from '../mission/entities/mission.entity';
import { MissionHistory } from './entities/mission_history.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Mission, MissionHistory])],
  controllers: [MissionHistoryController],
  providers: [MissionHistoryService],
})
export class MissionHistoryModule { } 
