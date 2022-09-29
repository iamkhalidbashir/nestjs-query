"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const graphql_1 = require("@nestjs/graphql");
const src_1 = require("../../src");
const decorators_1 = require("../../src/decorators");
const __fixtures__1 = require("../__fixtures__");
describe('DeleteManyInputType', () => {
    let DeleteManyDTO = class DeleteManyDTO {
    };
    (0, tslib_1.__decorate)([
        (0, decorators_1.FilterableField)(),
        (0, tslib_1.__metadata)("design:type", String)
    ], DeleteManyDTO.prototype, "field", void 0);
    DeleteManyDTO = (0, tslib_1.__decorate)([
        (0, graphql_1.ObjectType)()
    ], DeleteManyDTO);
    let DeleteMany = class DeleteMany extends (0, src_1.DeleteManyInputType)(DeleteManyDTO) {
    };
    DeleteMany = (0, tslib_1.__decorate)([
        (0, graphql_1.InputType)()
    ], DeleteMany);
    it('should create an args type with the field as the type', async () => {
        let DeleteManyInputTypeSpec = class DeleteManyInputTypeSpec {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            test(input) {
                return 1;
            }
        };
        (0, tslib_1.__decorate)([
            (0, graphql_1.Query)(() => graphql_1.Int),
            (0, tslib_1.__param)(0, (0, graphql_1.Args)('input')),
            (0, tslib_1.__metadata)("design:type", Function),
            (0, tslib_1.__metadata)("design:paramtypes", [DeleteMany]),
            (0, tslib_1.__metadata)("design:returntype", Number)
        ], DeleteManyInputTypeSpec.prototype, "test", null);
        DeleteManyInputTypeSpec = (0, tslib_1.__decorate)([
            (0, graphql_1.Resolver)()
        ], DeleteManyInputTypeSpec);
        const schema = await (0, __fixtures__1.generateSchema)([DeleteManyInputTypeSpec]);
        expect(schema).toMatchSnapshot();
    });
    describe('validation', () => {
        it('should validate the filter is defined', () => {
            const input = {};
            const it = (0, class_transformer_1.plainToClass)(DeleteMany, input);
            const errors = (0, class_validator_1.validateSync)(it);
            expect(errors).toEqual([
                {
                    children: [],
                    constraints: {
                        isNotEmptyObject: 'filter must be a non-empty object',
                    },
                    property: 'filter',
                    target: input,
                },
            ]);
        });
        it('should validate the filter is not empty', () => {
            const input = { filter: {} };
            const it = (0, class_transformer_1.plainToClass)(DeleteMany, input);
            const errors = (0, class_validator_1.validateSync)(it);
            expect(errors).toEqual([
                {
                    children: [],
                    constraints: {
                        isNotEmptyObject: 'filter must be a non-empty object',
                    },
                    property: 'filter',
                    target: input,
                    value: input.filter,
                },
            ]);
        });
    });
});
//# sourceMappingURL=delete-many-input.type.spec.js.map