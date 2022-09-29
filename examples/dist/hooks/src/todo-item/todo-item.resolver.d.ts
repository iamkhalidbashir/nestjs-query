import { QueryService, UpdateManyResponse } from '@nestjs-query/core';
import { TodoItemDTO } from './dto/todo-item.dto';
import { MarkTodoItemsAsCompletedArgs } from './types';
export declare class TodoItemResolver {
    readonly service: QueryService<TodoItemDTO>;
    constructor(service: QueryService<TodoItemDTO>);
    markTodoItemsAsCompleted({ input }: MarkTodoItemsAsCompletedArgs): Promise<UpdateManyResponse>;
}
