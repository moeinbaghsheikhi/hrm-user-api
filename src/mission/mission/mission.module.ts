import { Module } from '@nestjs/common';
import { MissionService } from './mission.service';
import { MissionController } from './mission.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mission } from './entities/mission.entity';
import { QueryService } from 'src/helper/query.service';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Mission]), UserModule],
  controllers: [MissionController],
  providers: [MissionService, QueryService],
})
export class MissionModule {}
