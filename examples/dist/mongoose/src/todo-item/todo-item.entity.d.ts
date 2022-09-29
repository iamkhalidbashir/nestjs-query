import { Types, Document } from 'mongoose';
export declare class TodoItemEntity extends Document {
    title: string;
    description?: string;
    completed: boolean;
    createdAt: Date;
    updatedAt: Date;
    tags: Types.ObjectId[];
    priority: number;
    createdBy?: string;
    updatedBy?: string;
}
export declare const TodoItemEntitySchema: import("mongoose").Schema<TodoItemEntity, import("mongoose").Model<any, any>, undefined>;
