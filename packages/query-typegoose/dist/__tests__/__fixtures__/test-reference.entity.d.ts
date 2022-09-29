import { Ref, mongoose } from '@typegoose/typegoose';
import { TestEntity } from './test.entity';
export declare class TestReference {
    _id: mongoose.Types.ObjectId;
    id: string;
    referenceName: string;
    testEntity?: Ref<TestEntity>;
    virtualTestEntity?: Ref<TestEntity>;
}
