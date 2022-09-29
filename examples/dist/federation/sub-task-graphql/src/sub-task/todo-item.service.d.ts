import { QueryService, RelationQueryService } from '@nestjs-query/core';
import { TodoItemReferenceDTO } from './dto/todo-item-reference.dto';
import { SubTaskEntity } from './sub-task.entity';
export declare class TodoItemService extends RelationQueryService<TodoItemReferenceDTO> {
    readonly subTaskService: QueryService<SubTaskEntity>;
    constructor(subTaskService: QueryService<SubTaskEntity>);
}
