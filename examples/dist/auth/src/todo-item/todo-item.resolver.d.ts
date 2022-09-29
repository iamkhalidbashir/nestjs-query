import { Filter, QueryService } from '@nestjs-query/core';
import { ConnectionType } from '@nestjs-query/query-graphql';
import { TodoItemDTO } from './dto/todo-item.dto';
import { TodoItemQuery } from './types';
export declare class TodoItemResolver {
    readonly service: QueryService<TodoItemDTO>;
    constructor(service: QueryService<TodoItemDTO>);
    completedTodoItems(query: TodoItemQuery, authFilter: Filter<TodoItemDTO>): Promise<ConnectionType<TodoItemDTO>>;
    uncompletedTodoItems(query: TodoItemQuery, authFilter: Filter<TodoItemDTO>): Promise<ConnectionType<TodoItemDTO>>;
    failingTodoItems(query: TodoItemQuery, authFilter: Filter<TodoItemDTO>): Promise<ConnectionType<TodoItemDTO>>;
}
