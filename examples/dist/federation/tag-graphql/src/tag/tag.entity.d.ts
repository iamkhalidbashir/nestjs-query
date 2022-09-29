import { TagTodoItemEntity } from './tag-todo-item.entity';
export declare class TagEntity {
    id: number;
    name: string;
    created: Date;
    updated: Date;
    tagTodoItems: TagTodoItemEntity[];
}
