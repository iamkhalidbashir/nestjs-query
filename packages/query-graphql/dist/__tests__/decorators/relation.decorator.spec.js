"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
// eslint-disable-next-line max-classes-per-file
const graphql_1 = require("@nestjs/graphql");
const src_1 = require("../../src");
const decorators_1 = require("../../src/decorators");
let TestRelation = class TestRelation {
};
TestRelation = (0, tslib_1.__decorate)([
    (0, graphql_1.ObjectType)()
], TestRelation);
describe('@Relation', () => {
    it('should add the relation metadata to the metadata storage', () => {
        const relationFn = () => TestRelation;
        const relationOpts = { disableRead: true };
        let TestDTO = class TestDTO {
        };
        TestDTO = (0, tslib_1.__decorate)([
            (0, graphql_1.ObjectType)(),
            (0, src_1.Relation)('test', relationFn, relationOpts)
        ], TestDTO);
        const relations = (0, decorators_1.getRelations)(TestDTO);
        expect(relations).toEqual({ one: { test: { DTO: TestRelation, allowFiltering: false, ...relationOpts } } });
    });
});
describe('@FilterableRelation', () => {
    it('should add the relation metadata to the metadata storage', () => {
        const relationFn = () => TestRelation;
        const relationOpts = { disableRead: true };
        let TestDTO = class TestDTO {
        };
        TestDTO = (0, tslib_1.__decorate)([
            (0, graphql_1.ObjectType)(),
            (0, src_1.FilterableRelation)('test', relationFn, relationOpts)
        ], TestDTO);
        const relations = (0, decorators_1.getRelations)(TestDTO);
        expect(relations).toEqual({ one: { test: { DTO: TestRelation, ...relationOpts, allowFiltering: true } } });
    });
});
describe('@UnPagedRelation', () => {
    it('should set the isMany flag if the relationFn returns an array', () => {
        const relationFn = () => TestRelation;
        const relationOpts = { disableRead: true };
        let TestDTO = class TestDTO {
        };
        TestDTO = (0, tslib_1.__decorate)([
            (0, graphql_1.ObjectType)(),
            (0, src_1.UnPagedRelation)('tests', relationFn, relationOpts)
        ], TestDTO);
        const relations = (0, decorators_1.getRelations)(TestDTO);
        expect(relations).toEqual({
            many: {
                tests: { DTO: TestRelation, ...relationOpts, allowFiltering: false, pagingStrategy: src_1.PagingStrategies.NONE },
            },
        });
    });
});
describe('@FilterableUnPagedRelation', () => {
    it('should add the relation metadata to the metadata storage', () => {
        const relationFn = () => TestRelation;
        const relationOpts = { disableRead: true };
        let TestDTO = class TestDTO {
        };
        TestDTO = (0, tslib_1.__decorate)([
            (0, graphql_1.ObjectType)(),
            (0, src_1.FilterableUnPagedRelation)('test', relationFn, relationOpts)
        ], TestDTO);
        const relations = (0, decorators_1.getRelations)(TestDTO);
        expect(relations).toEqual({
            many: {
                test: { DTO: TestRelation, pagingStrategy: src_1.PagingStrategies.NONE, ...relationOpts, allowFiltering: true },
            },
        });
    });
});
describe('@OffsetConnection', () => {
    it('should add the relation metadata to the metadata storage', () => {
        const relationFn = () => TestRelation;
        const relationOpts = { disableRead: true };
        let TestDTO = class TestDTO {
        };
        TestDTO = (0, tslib_1.__decorate)([
            (0, graphql_1.ObjectType)(),
            (0, src_1.OffsetConnection)('test', relationFn, relationOpts)
        ], TestDTO);
        const relations = (0, decorators_1.getRelations)(TestDTO);
        expect(relations).toEqual({
            many: {
                test: { DTO: TestRelation, ...relationOpts, allowFiltering: false, pagingStrategy: src_1.PagingStrategies.OFFSET },
            },
        });
    });
});
describe('@FilterableOffsetConnection', () => {
    it('should add the relation metadata to the metadata storage', () => {
        const relationFn = () => TestRelation;
        const relationOpts = { disableRead: true };
        let TestDTO = class TestDTO {
        };
        TestDTO = (0, tslib_1.__decorate)([
            (0, graphql_1.ObjectType)(),
            (0, decorators_1.FilterableOffsetConnection)('test', relationFn, relationOpts)
        ], TestDTO);
        const relations = (0, decorators_1.getRelations)(TestDTO);
        expect(relations).toEqual({
            many: {
                test: { DTO: TestRelation, ...relationOpts, pagingStrategy: src_1.PagingStrategies.OFFSET, allowFiltering: true },
            },
        });
    });
});
describe('@CursorConnection', () => {
    it('should add the relation metadata to the metadata storage', () => {
        const relationFn = () => TestRelation;
        const relationOpts = { disableRead: true };
        let TestDTO = class TestDTO {
        };
        TestDTO = (0, tslib_1.__decorate)([
            (0, graphql_1.ObjectType)(),
            (0, decorators_1.CursorConnection)('test', relationFn, relationOpts)
        ], TestDTO);
        const relations = (0, decorators_1.getRelations)(TestDTO);
        expect(relations).toEqual({
            many: {
                test: { DTO: TestRelation, ...relationOpts, allowFiltering: false, pagingStrategy: src_1.PagingStrategies.CURSOR },
            },
        });
    });
});
describe('@FilterableCursorConnection', () => {
    it('should add the relation metadata to the metadata storage', () => {
        const relationFn = () => TestRelation;
        const relationOpts = { disableRead: true };
        let TestDTO = class TestDTO {
        };
        TestDTO = (0, tslib_1.__decorate)([
            (0, graphql_1.ObjectType)(),
            (0, decorators_1.FilterableCursorConnection)('test', relationFn, relationOpts)
        ], TestDTO);
        const relations = (0, decorators_1.getRelations)(TestDTO);
        expect(relations).toEqual({
            many: {
                test: { DTO: TestRelation, ...relationOpts, pagingStrategy: src_1.PagingStrategies.CURSOR, allowFiltering: true },
            },
        });
    });
});
describe('getRelations', () => {
    let SomeRelation = class SomeRelation {
    };
    SomeRelation = (0, tslib_1.__decorate)([
        (0, graphql_1.ObjectType)()
    ], SomeRelation);
    let BaseType = class BaseType {
    };
    BaseType = (0, tslib_1.__decorate)([
        (0, graphql_1.ObjectType)({ isAbstract: true }),
        (0, src_1.Relation)('test', () => SomeRelation),
        (0, src_1.UnPagedRelation)('allTests', () => SomeRelation),
        (0, src_1.OffsetConnection)('offsetTests', () => SomeRelation),
        (0, decorators_1.CursorConnection)('cursorTests', () => SomeRelation)
    ], BaseType);
    let ImplementingClass = class ImplementingClass extends BaseType {
    };
    ImplementingClass = (0, tslib_1.__decorate)([
        (0, graphql_1.ObjectType)(),
        (0, src_1.Relation)('implementedRelation', () => SomeRelation),
        (0, src_1.UnPagedRelation)('implementedAllRelations', () => SomeRelation),
        (0, src_1.OffsetConnection)('implementedOffsetConnection', () => SomeRelation),
        (0, decorators_1.CursorConnection)('implementedCursorConnection', () => SomeRelation)
    ], ImplementingClass);
    let DuplicateImplementor = class DuplicateImplementor extends ImplementingClass {
    };
    DuplicateImplementor = (0, tslib_1.__decorate)([
        (0, graphql_1.ObjectType)(),
        (0, src_1.Relation)('implementedRelation', () => SomeRelation, { relationName: 'test' }),
        (0, src_1.UnPagedRelation)('implementedAllRelations', () => SomeRelation, { relationName: 'tests' }),
        (0, src_1.OffsetConnection)('implementedOffsetConnection', () => SomeRelation, { relationName: 'tests' }),
        (0, decorators_1.CursorConnection)('implementedCursorConnection', () => SomeRelation, { relationName: 'testConnection' })
    ], DuplicateImplementor);
    it('should return relations for a type', () => {
        expect((0, decorators_1.getRelations)(BaseType)).toEqual({
            one: {
                test: { DTO: SomeRelation, allowFiltering: false },
            },
            many: {
                allTests: { DTO: SomeRelation, allowFiltering: false, pagingStrategy: src_1.PagingStrategies.NONE },
                offsetTests: { DTO: SomeRelation, allowFiltering: false, pagingStrategy: src_1.PagingStrategies.OFFSET },
                cursorTests: { DTO: SomeRelation, allowFiltering: false, pagingStrategy: src_1.PagingStrategies.CURSOR },
            },
        });
    });
    it('should return inherited relations fields for a type', () => {
        expect((0, decorators_1.getRelations)(ImplementingClass)).toEqual({
            one: {
                test: { DTO: SomeRelation, allowFiltering: false },
                implementedRelation: { DTO: SomeRelation, allowFiltering: false },
            },
            many: {
                allTests: { DTO: SomeRelation, allowFiltering: false, pagingStrategy: src_1.PagingStrategies.NONE },
                offsetTests: { DTO: SomeRelation, allowFiltering: false, pagingStrategy: src_1.PagingStrategies.OFFSET },
                cursorTests: { DTO: SomeRelation, allowFiltering: false, pagingStrategy: src_1.PagingStrategies.CURSOR },
                implementedAllRelations: {
                    DTO: SomeRelation,
                    allowFiltering: false,
                    pagingStrategy: src_1.PagingStrategies.NONE,
                },
                implementedOffsetConnection: {
                    DTO: SomeRelation,
                    allowFiltering: false,
                    pagingStrategy: src_1.PagingStrategies.OFFSET,
                },
                implementedCursorConnection: {
                    DTO: SomeRelation,
                    allowFiltering: false,
                    pagingStrategy: src_1.PagingStrategies.CURSOR,
                },
            },
        });
    });
    it('should exclude duplicate inherited relations fields for a type', () => {
        expect((0, decorators_1.getRelations)(DuplicateImplementor)).toEqual({
            one: {
                test: { DTO: SomeRelation, allowFiltering: false },
                implementedRelation: { DTO: SomeRelation, allowFiltering: false, relationName: 'test' },
            },
            many: {
                allTests: { DTO: SomeRelation, allowFiltering: false, pagingStrategy: src_1.PagingStrategies.NONE },
                offsetTests: { DTO: SomeRelation, allowFiltering: false, pagingStrategy: src_1.PagingStrategies.OFFSET },
                cursorTests: { DTO: SomeRelation, allowFiltering: false, pagingStrategy: src_1.PagingStrategies.CURSOR },
                implementedAllRelations: {
                    DTO: SomeRelation,
                    allowFiltering: false,
                    pagingStrategy: src_1.PagingStrategies.NONE,
                    relationName: 'tests',
                },
                implementedOffsetConnection: {
                    DTO: SomeRelation,
                    allowFiltering: false,
                    pagingStrategy: src_1.PagingStrategies.OFFSET,
                    relationName: 'tests',
                },
                implementedCursorConnection: {
                    DTO: SomeRelation,
                    allowFiltering: false,
                    pagingStrategy: src_1.PagingStrategies.CURSOR,
                    relationName: 'testConnection',
                },
            },
        });
    });
});
//# sourceMappingURL=relation.decorator.spec.js.map