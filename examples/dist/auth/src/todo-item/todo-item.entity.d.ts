import { SubTaskEntity } from '../sub-task/sub-task.entity';
import { TagEntity } from '../tag/tag.entity';
import { UserEntity } from '../user/user.entity';
export declare class TodoItemEntity {
    id: number;
    title: string;
    description?: string;
    completed: boolean;
    ownerId: string;
    owner: UserEntity;
    subTasks: SubTaskEntity[];
    created: Date;
    updated: Date;
    tags: TagEntity[];
    priority: number;
    createdBy?: string;
    updatedBy?: string;
}
