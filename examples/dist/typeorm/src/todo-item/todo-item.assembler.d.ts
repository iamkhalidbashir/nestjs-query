import { ClassTransformerAssembler } from '@nestjs-query/core';
import { TodoItemDTO } from './dto/todo-item.dto';
import { TodoItemEntity } from './todo-item.entity';
export declare class TodoItemAssembler extends ClassTransformerAssembler<TodoItemDTO, TodoItemEntity> {
    convertToDTO(entity: TodoItemEntity): TodoItemDTO;
}
