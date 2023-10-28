import { Module } from '@nestjs/common';
import { LeavesService } from './leaves.service';
import { LeavesController } from './leaves.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Leaves } from './entities/leaves.entity';
import { QueryService } from 'src/helper/query.service';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Leaves]), UserModule],
  controllers: [LeavesController],
  providers: [LeavesService, QueryService],
})
export class LeavesModule { }
