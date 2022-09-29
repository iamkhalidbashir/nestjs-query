import { Document, Types } from 'mongoose';
export declare class TestEntity extends Document {
    stringType: string;
    boolType: boolean;
    numberType: number;
    dateType: Date;
    testReference?: Types.ObjectId | string;
    testReferences?: Types.ObjectId[];
}
export declare const TestEntitySchema: import("mongoose").Schema<TestEntity, import("mongoose").Model<any, any>, undefined>;
