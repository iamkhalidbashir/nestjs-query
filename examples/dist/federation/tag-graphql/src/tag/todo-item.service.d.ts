import { QueryService, RelationQueryService } from '@nestjs-query/core';
import { TodoItemReferenceDTO } from './dto/todo-item-reference.dto';
import { TagTodoItemEntity } from './tag-todo-item.entity';
export declare class TodoItemService extends RelationQueryService<TodoItemReferenceDTO> {
    readonly tagTodoItemService: QueryService<TagTodoItemEntity>;
    constructor(tagTodoItemService: QueryService<TagTodoItemEntity>);
}
