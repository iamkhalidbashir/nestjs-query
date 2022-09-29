"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/* eslint-disable @typescript-eslint/no-unused-vars */
const nestGraphql = (0, tslib_1.__importStar)(require("@nestjs/graphql"));
const resolverDecorator = (0, tslib_1.__importStar)(require("../../src/decorators/resolver-method.decorator"));
const decorators_1 = require("../../src/decorators");
describe('ResolverQuery decorator', () => {
    const resolverMethodSpy = jest.spyOn(resolverDecorator, 'ResolverMethod');
    const querySpy = jest.spyOn(nestGraphql, 'Query');
    beforeEach(() => jest.clearAllMocks());
    function createTestResolver(typeFunc, options, ...opts) {
        class TestResolver {
            method() {
                return true;
            }
        }
        (0, tslib_1.__decorate)([
            (0, decorators_1.ResolverQuery)(typeFunc, options, ...opts),
            (0, tslib_1.__metadata)("design:type", Function),
            (0, tslib_1.__metadata)("design:paramtypes", []),
            (0, tslib_1.__metadata)("design:returntype", Boolean)
        ], TestResolver.prototype, "method", null);
        return TestResolver;
    }
    it('should call Query with the correct mutation arguments', () => {
        const opts = [{}];
        createTestResolver(() => Boolean, { name: 'test' }, ...opts);
        const [rt, ao] = querySpy.mock.calls[0];
        expect(rt()).toEqual(Boolean);
        expect(ao).toEqual({ name: 'test' });
    });
    it('should call ResolverMethod with the correct options', () => {
        const opts = [{}];
        createTestResolver(() => Boolean, { name: 'test' }, ...opts);
        expect(resolverMethodSpy).toHaveBeenNthCalledWith(1, ...opts);
    });
    it('should not call ResolverMethod if disabled is true', () => {
        const opts = [{ disabled: true }];
        createTestResolver(() => Boolean, { name: 'test' }, ...opts);
        expect(querySpy).toHaveBeenCalledTimes(0);
        expect(resolverMethodSpy).toHaveBeenCalledTimes(0);
    });
});
//# sourceMappingURL=resolver-query.decorator.spec.js.map