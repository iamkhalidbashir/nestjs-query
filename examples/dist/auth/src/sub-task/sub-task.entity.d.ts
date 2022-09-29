import { TodoItemEntity } from '../todo-item/todo-item.entity';
import { UserEntity } from '../user/user.entity';
export declare class SubTaskEntity {
    id: number;
    title: string;
    description?: string;
    completed: boolean;
    ownerId: string;
    owner: UserEntity;
    todoItemId: string;
    todoItem: TodoItemEntity;
    created: Date;
    updated: Date;
    createdBy?: string;
    updatedBy?: string;
}
