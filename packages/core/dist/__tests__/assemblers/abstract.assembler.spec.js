"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const src_1 = require("../../src");
describe('ClassTransformerAssembler', () => {
    class TestDTO {
    }
    class TestEntity {
    }
    let TestAssembler = class TestAssembler extends src_1.AbstractAssembler {
        convertToCreateEntity(create) {
            return {
                first: create.firstName,
                last: create.lastName,
            };
        }
        convertToUpdateEntity(update) {
            return {
                first: update.firstName,
                last: update.lastName,
            };
        }
        convertToDTO(entity) {
            return {
                firstName: entity.first,
                lastName: entity.last,
            };
        }
        convertToEntity(dto) {
            return {
                first: dto.firstName,
                last: dto.lastName,
            };
        }
        convertQuery(query) {
            return (0, src_1.transformQuery)(query, {
                firstName: 'first',
                lastName: 'last',
            });
        }
        convertAggregateQuery(aggregate) {
            return (0, src_1.transformAggregateQuery)(aggregate, {
                firstName: 'first',
                lastName: 'last',
            });
        }
        convertAggregateResponse(aggregate) {
            return (0, src_1.transformAggregateResponse)(aggregate, {
                first: 'firstName',
                last: 'lastName',
            });
        }
    };
    TestAssembler = (0, tslib_1.__decorate)([
        (0, src_1.Assembler)(TestDTO, TestEntity)
    ], TestAssembler);
    const testDTO = { firstName: 'foo', lastName: 'bar' };
    const testEntity = { first: 'foo', last: 'bar' };
    it('should throw an error if DTOClass or EntityClass cannot be determined', () => {
        class TestBadAssembler extends TestAssembler {
        }
        expect(() => new TestBadAssembler()).toThrow('Unable to determine DTO or Entity types for TestBadAssembler. Did you annotate your assembler with @Assembler');
        expect(() => new TestBadAssembler(TestDTO)).toThrow('Unable to determine DTO or Entity types for TestBadAssembler. Did you annotate your assembler with @Assembler');
        expect(() => new TestBadAssembler(undefined, TestEntity)).toThrow('Unable to determine DTO or Entity types for TestBadAssembler. Did you annotate your assembler with @Assembler');
    });
    describe('convertToDTOs', () => {
        it('should call the convertToDTO implementation', () => {
            const assembler = new TestAssembler();
            expect(assembler.convertToDTOs([testEntity])).toEqual([testDTO]);
        });
    });
    describe('convertAsyncToDTO', () => {
        it('should call the convertToDTO implementation with the resolved value', () => {
            const assembler = new TestAssembler();
            return expect(assembler.convertAsyncToDTO(Promise.resolve(testEntity))).resolves.toEqual(testDTO);
        });
    });
    describe('convertAsyncToDTOs', () => {
        it('should call the convertToDTO implementation with the resolved value', () => {
            const assembler = new TestAssembler();
            return expect(assembler.convertAsyncToDTOs(Promise.resolve([testEntity]))).resolves.toEqual([testDTO]);
        });
    });
    describe('convertToEntities', () => {
        it('should call the convertToEntity implementation', () => {
            const assembler = new TestAssembler();
            expect(assembler.convertToEntities([testDTO])).toEqual([testEntity]);
        });
    });
    describe('convertAsyncToEntity', () => {
        it('should call the convertToEntity implementation with the resolved value', () => {
            const assembler = new TestAssembler();
            return expect(assembler.convertAsyncToEntity(Promise.resolve(testDTO))).resolves.toEqual(testEntity);
        });
    });
    describe('convertAsyncToEntities', () => {
        it('should call the convertToEntity implementation with the resolved value', () => {
            const assembler = new TestAssembler();
            return expect(assembler.convertAsyncToEntities(Promise.resolve([testDTO]))).resolves.toEqual([testEntity]);
        });
    });
});
//# sourceMappingURL=abstract.assembler.spec.js.map