import { Injectable } from '@nestjs/common';
import { isArray } from 'class-validator';
import { FilterParamsDto } from 'src/public/dto/get-by-filter.dto';
import { Repository } from 'typeorm';

@Injectable()
export class QueryService {
  createFilterQuery(repository: Repository<any>, filter: FilterParamsDto, table_name: string, user_id: any = null) {
    const queryBuilder = repository.createQueryBuilder(table_name);
    if (user_id) {
      queryBuilder.orWhere(table_name + '.user_id = '+ user_id);
    }

    if (filter['fields']) filter['fields'].forEach(element => {
      if (isArray(element['value'])) {
        element['value'].forEach(item => {
          queryBuilder.orWhere(table_name + '.' + element['key'] + ' ' + element['condition'] + "'" + item + "'");
        });
      }
      else if (isArray(element['key'])) {
        element['key'].forEach(item => {
          queryBuilder.orWhere(table_name + '.' + item + ' ' + element['condition'] + "'" + element['value'] + "'");
        });
      } else queryBuilder.andWhere(table_name + '.' + element['key'] + ' ' + element['condition'] + "'" + element['value'] + "'");
    });

    queryBuilder.skip((filter.pageNumber - 1) * filter.pageSize);
    queryBuilder.take(filter.pageSize);
    // console.log(queryBuilder.getQueryAndParameters())
    return queryBuilder;
  }
}