import { DocumentType, mongoose } from '@typegoose/typegoose';
import { TestEntity } from './test.entity';
import { TestDiscriminatedEntity } from './test-discriminated.entity';
import { TestReference } from './test-reference.entity';
export declare const TEST_ENTITIES: DocumentType<TestEntity>[];
export declare const TEST_DISCRIMINATED_ENTITIES: DocumentType<TestDiscriminatedEntity>[];
export declare const TEST_REFERENCES: DocumentType<TestReference>[];
export declare const TEST_REFERENCES_FOR_DISCRIMINATES: DocumentType<TestReference>[];
export declare const seed: (connection: mongoose.Connection) => Promise<void>;
