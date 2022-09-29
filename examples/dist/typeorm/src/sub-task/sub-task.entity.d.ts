import { TodoItemEntity } from '../todo-item/todo-item.entity';
export declare class SubTaskEntity {
    id: number;
    title: string;
    description?: string;
    completed: boolean;
    todoItemId: string;
    todoItem: TodoItemEntity;
    created: Date;
    updated: Date;
    createdBy?: string;
    updatedBy?: string;
}
