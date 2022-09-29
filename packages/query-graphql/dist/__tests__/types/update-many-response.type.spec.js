"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const graphql_1 = require("@nestjs/graphql");
const src_1 = require("../../src");
const __fixtures__1 = require("../__fixtures__");
describe('UpdateManyResponseType', () => {
    const URT = (0, src_1.UpdateManyResponseType)();
    it('should create a @nestjs/graphql object type', async () => {
        let UpdateManyResponseTypeResolver = class UpdateManyResponseTypeResolver {
            updateTest() {
                return { updatedCount: 1 };
            }
        };
        (0, tslib_1.__decorate)([
            (0, graphql_1.Query)(() => URT),
            (0, tslib_1.__metadata)("design:type", Function),
            (0, tslib_1.__metadata)("design:paramtypes", []),
            (0, tslib_1.__metadata)("design:returntype", Object)
        ], UpdateManyResponseTypeResolver.prototype, "updateTest", null);
        UpdateManyResponseTypeResolver = (0, tslib_1.__decorate)([
            (0, graphql_1.Resolver)()
        ], UpdateManyResponseTypeResolver);
        const schema = await (0, __fixtures__1.generateSchema)([UpdateManyResponseTypeResolver]);
        expect(schema).toMatchSnapshot();
    });
});
//# sourceMappingURL=update-many-response.type.spec.js.map