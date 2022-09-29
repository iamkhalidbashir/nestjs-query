import { Base } from '@typegoose/typegoose/lib/defaultClasses';
import { Ref } from '@typegoose/typegoose';
import { Types } from 'mongoose';
import { TodoItemEntity } from '../todo-item/todo-item.entity';
export declare class TagEntity implements Base {
    _id: Types.ObjectId;
    id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    createdBy?: string;
    updatedBy?: string;
    todoItems?: Ref<TodoItemEntity>[];
}
