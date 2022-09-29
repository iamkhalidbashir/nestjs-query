"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
const common_1 = require("@nestjs/common");
const helpers_1 = require("../../src/resolvers/helpers");
describe('helpers', () => {
    describe('transformAndValidate', () => {
        class TestClass {
            constructor() {
                this.int = 0;
            }
        }
        (0, tslib_1.__decorate)([
            (0, class_validator_1.IsInt)(),
            (0, class_validator_1.Min)(0),
            (0, tslib_1.__metadata)("design:type", Object)
        ], TestClass.prototype, "int", void 0);
        it('should not transform or validate a class that is already an instance', async () => {
            const instance = new TestClass();
            const v = await (0, helpers_1.transformAndValidate)(TestClass, instance);
            expect(v).toBe(instance);
        });
        it('should transform and validate an object into the class', async () => {
            const v = await (0, helpers_1.transformAndValidate)(TestClass, { int: 1 });
            expect(v).toBeInstanceOf(TestClass);
            expect(v.int).toBe(1);
            return expect((0, helpers_1.transformAndValidate)(TestClass, { int: -1 })).rejects.toBeInstanceOf(common_1.BadRequestException);
        });
    });
});
//# sourceMappingURL=helpers.spec.js.map