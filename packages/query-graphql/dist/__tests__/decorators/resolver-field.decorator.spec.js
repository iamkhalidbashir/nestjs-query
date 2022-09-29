"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const nestGraphql = (0, tslib_1.__importStar)(require("@nestjs/graphql"));
const decorators_1 = require("../../src/decorators");
const resolverDecorator = (0, tslib_1.__importStar)(require("../../src/decorators/resolver-method.decorator"));
describe('ResolverField decorator', () => {
    const resolverMethodSpy = jest.spyOn(resolverDecorator, 'ResolverMethod');
    const propertySpy = jest.spyOn(nestGraphql, 'ResolveField');
    beforeEach(() => jest.clearAllMocks());
    function createTestResolver(name, typeFunc, options, ...opts) {
        class TestResolver {
            method() {
                return true;
            }
        }
        (0, tslib_1.__decorate)([
            (0, decorators_1.ResolverField)(name, typeFunc, options, ...opts),
            (0, tslib_1.__metadata)("design:type", Function),
            (0, tslib_1.__metadata)("design:paramtypes", []),
            (0, tslib_1.__metadata)("design:returntype", Boolean)
        ], TestResolver.prototype, "method", null);
        return TestResolver;
    }
    it('should call ResolveField with the correct mutation arguments', () => {
        const opts = [{}];
        createTestResolver('test', () => Boolean, { nullable: true }, ...opts);
        const [n, rt, ao] = propertySpy.mock.calls[0];
        expect(n).toBe('test');
        expect(rt ? rt() : null).toEqual(Boolean);
        expect(ao).toEqual({ nullable: true });
    });
    it('should call ResolverMethod with the correct options', () => {
        const opts = [{}];
        createTestResolver('test', () => Boolean, { nullable: true }, ...opts);
        expect(resolverMethodSpy).toHaveBeenNthCalledWith(1, ...opts);
    });
    it('should not call ResolverMethod if disabled is true', () => {
        const opts = [{ disabled: true }];
        createTestResolver('test', () => Boolean, { nullable: true }, ...opts);
        expect(propertySpy).toHaveBeenCalledTimes(0);
        expect(resolverMethodSpy).toHaveBeenCalledTimes(0);
    });
});
//# sourceMappingURL=resolver-field.decorator.spec.js.map