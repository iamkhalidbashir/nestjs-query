"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const graphql_1 = require("@nestjs/graphql");
const decorators_1 = require("../../src/decorators");
const types_1 = require("../../src/types");
const __fixtures__1 = require("../__fixtures__");
describe('UpdateManyInputType', () => {
    let FakeUpdateManyType = class FakeUpdateManyType {
    };
    (0, tslib_1.__decorate)([
        (0, decorators_1.FilterableField)(),
        (0, class_validator_1.MinLength)(5),
        (0, tslib_1.__metadata)("design:type", String)
    ], FakeUpdateManyType.prototype, "name", void 0);
    FakeUpdateManyType = (0, tslib_1.__decorate)([
        (0, graphql_1.InputType)('FakeUpdateManyInput'),
        (0, graphql_1.ObjectType)()
    ], FakeUpdateManyType);
    let UpdateMany = class UpdateMany extends (0, types_1.UpdateManyInputType)(FakeUpdateManyType, FakeUpdateManyType) {
    };
    UpdateMany = (0, tslib_1.__decorate)([
        (0, graphql_1.InputType)()
    ], UpdateMany);
    it('should create an args type with the field as the type', async () => {
        let UpdateManyInputTypeSpec = class UpdateManyInputTypeSpec {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            updateTest(input) {
                return 1;
            }
        };
        (0, tslib_1.__decorate)([
            (0, graphql_1.Query)(() => graphql_1.Int),
            (0, tslib_1.__param)(0, (0, graphql_1.Args)('input')),
            (0, tslib_1.__metadata)("design:type", Function),
            (0, tslib_1.__metadata)("design:paramtypes", [UpdateMany]),
            (0, tslib_1.__metadata)("design:returntype", Number)
        ], UpdateManyInputTypeSpec.prototype, "updateTest", null);
        UpdateManyInputTypeSpec = (0, tslib_1.__decorate)([
            (0, graphql_1.Resolver)()
        ], UpdateManyInputTypeSpec);
        const schema = await (0, __fixtures__1.generateSchema)([UpdateManyInputTypeSpec]);
        expect(schema).toMatchSnapshot();
    });
    it('should return the input when accessing the update field', () => {
        const Type = (0, types_1.UpdateManyInputType)(FakeUpdateManyType, FakeUpdateManyType);
        const input = {};
        const it = (0, class_transformer_1.plainToClass)(Type, input);
        expect(it).toEqual(input);
    });
    describe('validation', () => {
        it('should validate the filter is not empty', () => {
            const input = { update: { name: 'hello world' } };
            const it = (0, class_transformer_1.plainToClass)(UpdateMany, input);
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
        it('should validate the update input', () => {
            const input = { filter: { name: { eq: 'hello world' } }, update: {} };
            const it = (0, class_transformer_1.plainToClass)(UpdateMany, input);
            const errors = (0, class_validator_1.validateSync)(it);
            expect(errors).toEqual([
                {
                    children: [
                        {
                            children: [],
                            constraints: {
                                minLength: 'name must be longer than or equal to 5 characters',
                            },
                            property: 'name',
                            target: {},
                        },
                    ],
                    property: 'update',
                    target: input,
                    value: input.update,
                },
            ]);
        });
    });
});
//# sourceMappingURL=update-many-input.type.spec.js.map