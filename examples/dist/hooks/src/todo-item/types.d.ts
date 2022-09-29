import { MutationArgsType, UpdateManyInputType } from '@nestjs-query/query-graphql';
import { TodoItemDTO } from './dto/todo-item.dto';
import { TodoItemUpdateDTO } from './dto/todo-item-update.dto';
declare const MarkTodoItemAsCompleted_base: import("@nestjs/common").Type<Omit<TodoItemUpdateDTO, "completed">>;
declare class MarkTodoItemAsCompleted extends MarkTodoItemAsCompleted_base {
}
declare const MarkTodoItemsAsCompletedInput_base: import("@nestjs-query/core").Class<UpdateManyInputType<TodoItemDTO, MarkTodoItemAsCompleted>>;
declare class MarkTodoItemsAsCompletedInput extends MarkTodoItemsAsCompletedInput_base {
}
declare const MarkTodoItemsAsCompletedArgs_base: import("@nestjs-query/core").Class<MutationArgsType<MarkTodoItemsAsCompletedInput>>;
export declare class MarkTodoItemsAsCompletedArgs extends MarkTodoItemsAsCompletedArgs_base {
}
export {};
