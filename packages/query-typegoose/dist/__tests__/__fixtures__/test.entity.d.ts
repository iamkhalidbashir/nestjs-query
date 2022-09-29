import { Ref, mongoose } from '@typegoose/typegoose';
import { TestReference } from './test-reference.entity';
export declare class TestEntity {
    _id: mongoose.Types.ObjectId;
    id: string;
    stringType: string;
    boolType: boolean;
    numberType: number;
    dateType: Date;
    testReference?: Ref<TestReference> | string;
    testReferences?: Ref<TestReference>[];
    virtualTestReferences?: Ref<TestReference>[];
}
