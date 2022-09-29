import { Model } from 'sequelize-typescript';
import { TodoItemEntity } from '../todo-item/entity/todo-item.entity';
export declare class TagEntity extends Model<TagEntity, Partial<TagEntity>> {
    id: number;
    name: string;
    created: Date;
    updated: Date;
    todoItems: TodoItemEntity[];
}
