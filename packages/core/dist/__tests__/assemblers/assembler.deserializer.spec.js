"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const assembler_deserializer_1 = require("../../src/assemblers/assembler.deserializer");
const src_1 = require("../../src");
describe('AssemblerDeserializer decorator', () => {
    it('should register a serializer', () => {
        // @ts-ignore
        // eslint-disable-next-line @typescript-eslint/ban-types
        let TestSerializer = class TestSerializer {
        };
        TestSerializer = (0, tslib_1.__decorate)([
            (0, src_1.AssemblerDeserializer)((obj) => ({ foo: obj.bar }))
        ], TestSerializer);
        expect((0, assembler_deserializer_1.getAssemblerDeserializer)(TestSerializer)({ bar: 'bar' })).toEqual({ foo: 'bar' });
    });
    it('should throw an error if the serializer is registered twice', () => {
        // @ts-ignore
        // eslint-disable-next-line @typescript-eslint/ban-types
        const deserializer = (obj) => ({ foo: obj.bar });
        let TestSerializer = class TestSerializer {
        };
        TestSerializer = (0, tslib_1.__decorate)([
            (0, src_1.AssemblerDeserializer)(deserializer)
        ], TestSerializer);
        expect(() => (0, src_1.AssemblerDeserializer)(deserializer)(TestSerializer)).toThrow('Assembler Deserializer already registered for TestSerializer');
    });
});
//# sourceMappingURL=assembler.deserializer.spec.js.map