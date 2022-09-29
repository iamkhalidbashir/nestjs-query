"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const graphql_1 = require("@nestjs/graphql");
const src_1 = require("../src");
const filterable_field_decorator_1 = require("../src/decorators/filterable-field.decorator");
describe('NestjsQueryGraphQLModule', () => {
    let TestDTO = class TestDTO {
    };
    (0, tslib_1.__decorate)([
        (0, filterable_field_decorator_1.FilterableField)(),
        (0, tslib_1.__metadata)("design:type", String)
    ], TestDTO.prototype, "name", void 0);
    TestDTO = (0, tslib_1.__decorate)([
        (0, graphql_1.ObjectType)()
    ], TestDTO);
    it('should create a module', () => {
        const graphqlModule = src_1.NestjsQueryGraphQLModule.forFeature({
            imports: [],
            resolvers: [
                {
                    DTOClass: TestDTO,
                    EntityClass: TestDTO,
                },
            ],
        });
        expect(graphqlModule.imports).toHaveLength(1);
        expect(graphqlModule.module).toBe(src_1.NestjsQueryGraphQLModule);
        expect(graphqlModule.providers).toHaveLength(3);
        expect(graphqlModule.exports).toHaveLength(4);
    });
    it('should allow a defaultFilter for read options', () => {
        const graphqlModule = src_1.NestjsQueryGraphQLModule.forFeature({
            imports: [],
            resolvers: [
                {
                    DTOClass: TestDTO,
                    EntityClass: TestDTO,
                    read: { defaultFilter: { name: { eq: 'foo' } } },
                },
            ],
        });
        expect(graphqlModule.imports).toHaveLength(1);
        expect(graphqlModule.module).toBe(src_1.NestjsQueryGraphQLModule);
        expect(graphqlModule.providers).toHaveLength(3);
        expect(graphqlModule.exports).toHaveLength(4);
    });
});
//# sourceMappingURL=module.spec.js.map