import { Model } from 'sequelize-typescript';
import { TestRelation } from './test-relation.entity';
export declare class TestEntity extends Model<TestEntity, Partial<TestEntity>> {
    testEntityPk: string;
    stringType: string;
    boolType: boolean;
    numberType: number;
    dateType: Date;
    testRelations?: TestRelation[];
    manyTestRelations?: TestRelation[];
    oneTestRelation?: TestRelation;
}
