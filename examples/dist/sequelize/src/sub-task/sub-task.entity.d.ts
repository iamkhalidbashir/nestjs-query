import { Model } from 'sequelize-typescript';
import { TodoItemEntity } from '../todo-item/entity/todo-item.entity';
export declare class SubTaskEntity extends Model<SubTaskEntity, Partial<SubTaskEntity>> {
    id: number;
    title: string;
    description?: string;
    completed: boolean;
    todoItemId: number;
    todoItem: TodoItemEntity;
    created: Date;
    updated: Date;
}
