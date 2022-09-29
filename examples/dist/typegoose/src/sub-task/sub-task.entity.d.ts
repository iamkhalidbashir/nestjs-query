import { Base } from '@typegoose/typegoose/lib/defaultClasses';
import { Ref } from '@typegoose/typegoose';
import { Types } from 'mongoose';
import { TodoItemEntity } from '../todo-item/todo-item.entity';
export declare class SubTaskEntity implements Base {
    _id: Types.ObjectId;
    id: string;
    title: string;
    description?: string;
    completed: boolean;
    todoItem: Ref<TodoItemEntity>;
    createdAt: Date;
    updatedAt: Date;
    createdBy?: string;
    updatedBy?: string;
}
