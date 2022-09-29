import { Base } from '@typegoose/typegoose/lib/defaultClasses';
import { Ref } from '@typegoose/typegoose';
import { Types } from 'mongoose';
import { SubTaskEntity } from '../sub-task/sub-task.entity';
import { TagEntity } from '../tag/tag.entity';
export declare class TodoItemEntity implements Base {
    _id: Types.ObjectId;
    id: string;
    title: string;
    description?: string;
    completed: boolean;
    createdAt: Date;
    updatedAt: Date;
    tags: Ref<TagEntity>[];
    priority: number;
    createdBy?: string;
    updatedBy?: string;
    subTasks?: Ref<SubTaskEntity>[];
}
