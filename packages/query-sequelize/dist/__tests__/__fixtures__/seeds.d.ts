import { Sequelize } from 'sequelize-typescript';
import { TestRelation } from './test-relation.entity';
import { TestEntity } from './test.entity';
export declare const PLAIN_TEST_ENTITIES: Pick<TestEntity, 'testEntityPk' | 'boolType' | 'dateType' | 'numberType' | 'stringType'>[];
export declare const PLAIN_TEST_RELATIONS: Pick<TestRelation, 'testRelationPk' | 'relationName' | 'testEntityId'>[];
export declare const seed: (sequelize: Sequelize) => Promise<void>;
