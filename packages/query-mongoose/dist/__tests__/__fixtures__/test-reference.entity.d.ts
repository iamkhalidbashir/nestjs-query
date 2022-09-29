import { Document, Types } from 'mongoose';
export declare class TestReference extends Document {
    referenceName: string;
    testEntity?: Types.ObjectId;
}
export declare const TestReferenceSchema: import("mongoose").Schema<TestReference, import("mongoose").Model<any, any>, undefined>;
