import { TodoItemEntity } from '../todo-item/todo-item.entity';
export declare class TagEntity {
    id: number;
    name: string;
    created: Date;
    updated: Date;
    todoItems: TodoItemEntity[];
}
