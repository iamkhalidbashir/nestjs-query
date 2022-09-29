import { DeepPartial, DeleteManyResponse, Filter, NoOpQueryService, Query, QueryService, UpdateManyResponse } from '@nestjs-query/core';
import { TodoItemInputDTO } from './dto/todo-item-input.dto';
import { TodoItemDTO } from './dto/todo-item.dto';
import { TodoItemEntity } from './todo-item.entity';
export declare class TodoItemService extends NoOpQueryService<TodoItemDTO, TodoItemInputDTO> {
    private readonly queryService;
    constructor(queryService: QueryService<TodoItemEntity>);
    createOne({ name: title, isCompleted: completed }: TodoItemInputDTO): Promise<TodoItemDTO>;
    createMany(items: TodoItemInputDTO[]): Promise<TodoItemDTO[]>;
    query(query: Query<TodoItemDTO>): Promise<TodoItemDTO[]>;
    findById(id: string | number): Promise<TodoItemDTO | undefined>;
    getById(id: string | number): Promise<TodoItemDTO>;
    updateMany(update: DeepPartial<TodoItemDTO>, filter: Filter<TodoItemDTO>): Promise<UpdateManyResponse>;
    updateOne(id: string | number, update: DeepPartial<TodoItemDTO>): Promise<TodoItemDTO>;
    deleteMany(filter: Filter<TodoItemDTO>): Promise<DeleteManyResponse>;
    deleteOne(id: string | number): Promise<TodoItemDTO>;
}
