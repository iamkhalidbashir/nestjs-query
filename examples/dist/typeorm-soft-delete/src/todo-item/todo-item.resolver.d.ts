import { UpdateManyResponse, Filter } from '@nestjs-query/core';
import { TodoItemDTO } from './dto/todo-item.dto';
import { TodoItemService } from './todo-item.service';
export declare class TodoItemResolver {
    readonly service: TodoItemService;
    constructor(service: TodoItemService);
    restoreOneTodoItem(id: number): Promise<TodoItemDTO>;
    restoreManyTodoItems(filter: Filter<TodoItemDTO>): Promise<UpdateManyResponse>;
}
