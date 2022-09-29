import { TodoItemEntity } from '../todo-item/todo-item.entity';
export declare class UserEntity {
    id: number;
    username: string;
    password?: string;
    created: Date;
    updated: Date;
    todoItems: TodoItemEntity[];
}
