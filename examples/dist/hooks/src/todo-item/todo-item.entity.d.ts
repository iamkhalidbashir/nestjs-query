import { SubTaskEntity } from '../sub-task/sub-task.entity';
import { TagEntity } from '../tag/tag.entity';
export declare class TodoItemEntity {
    id: number;
    title: string;
    description?: string;
    completed: boolean;
    subTasks: SubTaskEntity[];
    created: Date;
    updated: Date;
    tags: TagEntity[];
    priority: number;
    createdBy?: string;
    updatedBy?: string;
}
