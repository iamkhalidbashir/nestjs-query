import { Types, Document } from 'mongoose';
export declare class SubTaskEntity extends Document {
    title: string;
    description?: string;
    completed: boolean;
    todoItem: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
    createdBy?: string;
    updatedBy?: string;
}
export declare const SubTaskEntitySchema: import("mongoose").Schema<SubTaskEntity, import("mongoose").Model<any, any>, undefined>;
