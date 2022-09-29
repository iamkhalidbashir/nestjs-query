"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
// eslint-disable-next-line max-classes-per-file
const classTransformer = (0, tslib_1.__importStar)(require("class-transformer"));
const src_1 = require("../../src");
describe('ClassTransformerAssembler', () => {
    const plainToClassSpy = jest.spyOn(classTransformer, 'plainToClass');
    class TestDTO {
    }
    class TestEntity {
    }
    let TestClassAssembler = class TestClassAssembler extends src_1.ClassTransformerAssembler {
    };
    TestClassAssembler = (0, tslib_1.__decorate)([
        (0, src_1.Assembler)(TestDTO, TestEntity)
    ], TestClassAssembler);
    beforeEach(() => jest.clearAllMocks());
    describe('convertToDTO', () => {
        it('should call plainToClass with the DTO class and the passed in entity', () => {
            const input = { firstName: 'foo', lastName: 'bar' };
            const assembler = new TestClassAssembler();
            const converted = assembler.convertToDTO(input);
            expect(converted).toBeInstanceOf(TestDTO);
            expect(plainToClassSpy).toHaveBeenCalledTimes(1);
            expect(plainToClassSpy).toHaveBeenCalledWith(TestDTO, input);
        });
    });
    describe('convertToEntity', () => {
        it('should call plainToClass with the Entity class and the passed in dto', () => {
            const input = { firstName: 'foo', lastName: 'bar' };
            const assembler = new TestClassAssembler();
            const converted = assembler.convertToEntity(input);
            expect(converted).toBeInstanceOf(TestEntity);
            expect(plainToClassSpy).toHaveBeenCalledTimes(1);
            expect(plainToClassSpy).toHaveBeenCalledWith(TestEntity, input);
        });
    });
    describe('convertQuery', () => {
        it('should call plainToClass with the DTO class and the passed in entity', () => {
            const input = { filter: { firstName: { eq: 'foo' } } };
            const assembler = new TestClassAssembler();
            const converted = assembler.convertQuery(input);
            expect(converted).toBe(input);
            expect(plainToClassSpy).not.toHaveBeenCalled();
        });
    });
    describe('with serializer', () => {
        const testDtoSerialize = jest.fn((td) => ({ firstName: td.firstName, lastName: td.lastName }));
        const testEntitySerialize = jest.fn((te) => ({
            firstName: te.firstName,
            lastName: te.lastName,
        }));
        let TestSerializeDTO = class TestSerializeDTO {
        };
        TestSerializeDTO = (0, tslib_1.__decorate)([
            (0, src_1.AssemblerSerializer)(testDtoSerialize)
        ], TestSerializeDTO);
        let TestSerializeEntity = class TestSerializeEntity {
        };
        TestSerializeEntity = (0, tslib_1.__decorate)([
            (0, src_1.AssemblerSerializer)(testEntitySerialize)
        ], TestSerializeEntity);
        let TestSerializeClassAssembler = class TestSerializeClassAssembler extends src_1.ClassTransformerAssembler {
        };
        TestSerializeClassAssembler = (0, tslib_1.__decorate)([
            (0, src_1.Assembler)(TestSerializeDTO, TestSerializeEntity)
        ], TestSerializeClassAssembler);
        it('should use a serializer to convert to the DTO plain object', () => {
            const input = new TestSerializeEntity();
            input.firstName = 'foo';
            input.lastName = 'bar';
            const assembler = new TestSerializeClassAssembler();
            const converted = assembler.convertToDTO(input);
            expect(testEntitySerialize).toHaveBeenCalledWith(input);
            expect(converted).toBeInstanceOf(TestSerializeDTO);
            expect(plainToClassSpy).toHaveBeenCalledTimes(1);
            expect(plainToClassSpy).toHaveBeenCalledWith(TestSerializeDTO, input);
        });
        it('should use a serializer to convert to the entity plain object', () => {
            const input = new TestSerializeDTO();
            input.firstName = 'foo';
            input.lastName = 'bar';
            const assembler = new TestSerializeClassAssembler();
            const converted = assembler.convertToEntity(input);
            expect(testDtoSerialize).toHaveBeenCalledWith(input);
            expect(converted).toBeInstanceOf(TestSerializeEntity);
            expect(plainToClassSpy).toHaveBeenCalledTimes(1);
            expect(plainToClassSpy).toHaveBeenCalledWith(TestSerializeEntity, input);
        });
    });
    describe('with deserializer', () => {
        const testDtoDeserialize = jest.fn((td) => {
            // eslint-disable-next-line @typescript-eslint/no-use-before-define
            const input = new TestDeserializeDTO();
            // @ts-ignore
            input.firstName = td.foo;
            // @ts-ignore
            input.lastName = td.bar;
            return input;
        });
        const testEntityDserialize = jest.fn((te) => {
            // eslint-disable-next-line @typescript-eslint/no-use-before-define
            const input = new TestDeserializeEntity();
            // @ts-ignore
            input.firstName = te.foo;
            // @ts-ignore
            input.lastName = te.bar;
            return input;
        });
        let TestDeserializeDTO = class TestDeserializeDTO {
        };
        TestDeserializeDTO = (0, tslib_1.__decorate)([
            (0, src_1.AssemblerDeserializer)(testDtoDeserialize)
        ], TestDeserializeDTO);
        let TestDeserializeEntity = class TestDeserializeEntity {
        };
        TestDeserializeEntity = (0, tslib_1.__decorate)([
            (0, src_1.AssemblerDeserializer)(testEntityDserialize)
        ], TestDeserializeEntity);
        let TestDesrializeClassAssembler = class TestDesrializeClassAssembler extends src_1.ClassTransformerAssembler {
        };
        TestDesrializeClassAssembler = (0, tslib_1.__decorate)([
            (0, src_1.Assembler)(TestDeserializeDTO, TestDeserializeEntity)
        ], TestDesrializeClassAssembler);
        it('should use a serializer to convert to the DTO plain object', () => {
            const input = new TestDeserializeEntity();
            input.firstName = 'foo';
            input.lastName = 'bar';
            const assembler = new TestDesrializeClassAssembler();
            const converted = assembler.convertToDTO(input);
            expect(testDtoDeserialize).toHaveBeenCalledWith(input);
            expect(converted).toBeInstanceOf(TestDeserializeDTO);
            expect(plainToClassSpy).toHaveBeenCalledTimes(0);
        });
        it('should use a serializer to convert to the entity plain object', () => {
            const input = new TestDeserializeDTO();
            input.firstName = 'foo';
            input.lastName = 'bar';
            const assembler = new TestDesrializeClassAssembler();
            const converted = assembler.convertToEntity(input);
            expect(converted).toBeInstanceOf(TestDeserializeEntity);
            expect(testEntityDserialize).toHaveBeenCalledWith(input);
            expect(plainToClassSpy).toHaveBeenCalledTimes(0);
        });
    });
});
//# sourceMappingURL=class-transformer.assembler.spec.js.map