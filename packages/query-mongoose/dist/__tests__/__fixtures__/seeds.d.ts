import { Connection } from 'mongoose';
import { TestEntity } from './test.entity';
import { TestReference } from './test-reference.entity';
export declare const TEST_ENTITIES: TestEntity[];
export declare const TEST_REFERENCES: TestReference[];
export declare const seed: (connection: Connection) => Promise<void>;
