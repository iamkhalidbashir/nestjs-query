import { Document } from 'mongoose';
export declare class TagEntity extends Document {
    name: string;
    createdAt: Date;
    updatedAt: Date;
    createdBy?: string;
    updatedBy?: string;
}
export declare const TagEntitySchema: import("mongoose").Schema<TagEntity, import("mongoose").Model<any, any>, undefined>;
