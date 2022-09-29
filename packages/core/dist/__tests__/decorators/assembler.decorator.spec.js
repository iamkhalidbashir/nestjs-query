"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const src_1 = require("../../src");
class TestFrom {
}
class TestTo {
}
describe('@Assembler', () => {
    it('should register an assembler with metadata', () => {
        let TestAssembler = class TestAssembler extends src_1.ClassTransformerAssembler {
            toPlain(dtoOrEntity) {
                return dtoOrEntity;
            }
        };
        TestAssembler = (0, tslib_1.__decorate)([
            (0, src_1.Assembler)(TestFrom, TestTo)
        ], TestAssembler);
        expect(src_1.AssemblerFactory.getAssembler(TestFrom, TestTo)).toBeInstanceOf(TestAssembler);
        expect(src_1.AssemblerFactory.getAssembler(TestTo, TestFrom)).toBeInstanceOf(src_1.DefaultAssembler);
    });
    it('should throw an error when registering an assembler for the same From To combo', () => {
        class TestAssembler extends src_1.ClassTransformerAssembler {
            toPlain(dtoOrEntity) {
                return dtoOrEntity;
            }
        }
        expect(() => (0, src_1.Assembler)(TestFrom, TestTo)(TestAssembler)).toThrow('Assembler already registered for TestFrom TestTo');
    });
});
//# sourceMappingURL=assembler.decorator.spec.js.map