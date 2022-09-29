import { TypeOrmQueryService } from '@nestjs-query/query-typeorm';
import { Repository } from 'typeorm';
import { TodoItemEntity } from './todo-item.entity';
export declare class TodoItemService extends TypeOrmQueryService<TodoItemEntity> {
    constructor(repo: Repository<TodoItemEntity>);
}
