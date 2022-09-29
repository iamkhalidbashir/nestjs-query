import { TestEntityRelationEntity } from './test-entity-relation.entity';
import { TestEntity } from './test.entity';
import { RelationOfTestRelationEntity } from './relation-of-test-relation.entity';
export declare class TestRelation {
    testRelationPk: string;
    relationName: string;
    testEntityId?: string;
    uniDirectionalTestEntityId?: string;
    testEntity?: TestEntity;
    testEntityUniDirectional?: TestEntity;
    manyTestEntities?: TestEntity[];
    oneTestEntity?: TestEntity;
    testEntityRelation?: TestEntityRelationEntity;
    relationsOfTestRelation?: RelationOfTestRelationEntity;
    relationOfTestRelationId?: string;
    relationOfTestRelation?: RelationOfTestRelationEntity;
}
