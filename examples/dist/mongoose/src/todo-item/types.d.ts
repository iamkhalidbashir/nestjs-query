import { TodoItemDTO } from './dto/todo-item.dto';
declare const TodoItemQuery_base: import("@nestjs-query/query-graphql/dist/src/types/query").StaticQueryType<TodoItemDTO, import("@nestjs-query/query-graphql").PagingStrategies>;
export declare class TodoItemQuery extends TodoItemQuery_base {
}
export declare const TodoItemConnection: import("@nestjs-query/query-graphql").StaticConnectionType<TodoItemDTO, import("@nestjs-query/query-graphql").PagingStrategies>;
export {};
