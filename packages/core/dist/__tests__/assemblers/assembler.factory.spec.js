"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const src_1 = require("../../src");
describe('AssemblerFactory', () => {
    class TestDTO {
    }
    class TestEntity {
    }
    let TestAssembler = class TestAssembler extends src_1.ClassTransformerAssembler {
    };
    TestAssembler = (0, tslib_1.__decorate)([
        (0, src_1.Assembler)(TestDTO, TestEntity)
    ], TestAssembler);
    describe('#getAssembler', () => {
        it('should return the correct assembler based on the classes', () => {
            expect(src_1.AssemblerFactory.getAssembler(TestDTO, TestEntity)).toBeInstanceOf(TestAssembler);
        });
        it('should return a default assembler if an assembler for the classes is not found', () => {
            expect(src_1.AssemblerFactory.getAssembler(TestDTO, TestDTO)).toBeInstanceOf(src_1.DefaultAssembler);
        });
    });
});
//# sourceMappingURL=assembler.factory.spec.js.map