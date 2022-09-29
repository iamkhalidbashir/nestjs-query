"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const graphql_1 = require("@nestjs/graphql");
const types_1 = require("../../src/types");
const __fixtures__1 = require("../__fixtures__");
describe('DeleteManyResponseType', () => {
    it('should create a @nestjs/graphql object type', async () => {
        const D = (0, types_1.DeleteManyResponseType)();
        let TestDeleteManyResponseResolver = class TestDeleteManyResponseResolver {
            deleteTest() {
                return { deletedCount: 1 };
            }
        };
        (0, tslib_1.__decorate)([
            (0, graphql_1.Query)(() => D),
            (0, tslib_1.__metadata)("design:type", Function),
            (0, tslib_1.__metadata)("design:paramtypes", []),
            (0, tslib_1.__metadata)("design:returntype", Object)
        ], TestDeleteManyResponseResolver.prototype, "deleteTest", null);
        TestDeleteManyResponseResolver = (0, tslib_1.__decorate)([
            (0, graphql_1.Resolver)()
        ], TestDeleteManyResponseResolver);
        const schema = await (0, __fixtures__1.generateSchema)([TestDeleteManyResponseResolver]);
        expect(schema).toMatchSnapshot();
    });
});
//# sourceMappingURL=delete-many-response.type.spec.js.map