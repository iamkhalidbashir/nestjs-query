import { Model } from 'sequelize-typescript';
import { TestEntity } from './test.entity';
export declare class TestRelation extends Model<TestRelation, Partial<TestRelation>> {
    testRelationPk: string;
    relationName: string;
    testEntityId?: string;
    testEntity?: TestEntity;
    manyTestEntities?: TestEntity[];
    oneTestEntity?: TestEntity;
}
