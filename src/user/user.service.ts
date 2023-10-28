import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { QueryService } from 'src/helper/query.service';
import { FilterParamsDto } from 'src/public/dto/get-by-filter.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private readonly queryService: QueryService
  ) { }
  create(createUserDto: CreateUserDto) {
    let YMD = createUserDto?.birthday_date.split("/")
    if(YMD.length < 3)
      return false
    let createData = {...createUserDto, birthday_year: parseInt(YMD[0]), birthday_month: parseInt(YMD[1]), birthday_day: parseInt(YMD[2])}
    const user = this.userRepository.create({ ...createData})

    return this.userRepository.save(user)
  }

  findAll() {
    return this.userRepository.find()
  }

  async findAllByFilter(filter: FilterParamsDto) {
    const queryBuilder = this.queryService.createFilterQuery(this.userRepository, filter, "users");
    const records = await queryBuilder.getMany();
    return records;
  }

  findOne(id: number) {
    return this.userRepository.findOneBy({ id })
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepository.update({ id }, { ...updateUserDto })
  }

  remove(id: number) {
    return this.userRepository.delete(id)
  }

  findByMobile(mobile: string) {
    return this.userRepository.findOneBy({ mobile })
  }
}
