"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
// eslint-disable-next-line max-classes-per-file
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const graphql_1 = require("@nestjs/graphql");
const src_1 = require("../../src");
const __fixtures__1 = require("../__fixtures__");
describe('UpdateOneInputType', () => {
    let FakeDTO = class FakeDTO {
    };
    (0, tslib_1.__decorate)([
        (0, graphql_1.Field)(() => graphql_1.ID),
        (0, tslib_1.__metadata)("design:type", String)
    ], FakeDTO.prototype, "id", void 0);
    FakeDTO = (0, tslib_1.__decorate)([
        (0, graphql_1.ObjectType)()
    ], FakeDTO);
    let FakeUpdateOneType = class FakeUpdateOneType {
    };
    (0, tslib_1.__decorate)([
        (0, graphql_1.Field)(),
        (0, class_validator_1.MinLength)(5),
        (0, tslib_1.__metadata)("design:type", String)
    ], FakeUpdateOneType.prototype, "name", void 0);
    FakeUpdateOneType = (0, tslib_1.__decorate)([
        (0, graphql_1.InputType)()
    ], FakeUpdateOneType);
    let UpdateOne = class UpdateOne extends (0, src_1.UpdateOneInputType)(FakeDTO, FakeUpdateOneType) {
    };
    UpdateOne = (0, tslib_1.__decorate)([
        (0, graphql_1.InputType)()
    ], UpdateOne);
    it('should create an input type with the id and update type as fields', async () => {
        let UpdateOneInputTypeSpec = class UpdateOneInputTypeSpec {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            updateTest(input) {
                return 1;
            }
        };
        (0, tslib_1.__decorate)([
            (0, graphql_1.Query)(() => graphql_1.Int),
            (0, tslib_1.__param)(0, (0, graphql_1.Args)('input')),
            (0, tslib_1.__metadata)("design:type", Function),
            (0, tslib_1.__metadata)("design:paramtypes", [UpdateOne]),
            (0, tslib_1.__metadata)("design:returntype", Number)
        ], UpdateOneInputTypeSpec.prototype, "updateTest", null);
        UpdateOneInputTypeSpec = (0, tslib_1.__decorate)([
            (0, graphql_1.Resolver)()
        ], UpdateOneInputTypeSpec);
        const schema = await (0, __fixtures__1.generateSchema)([UpdateOneInputTypeSpec]);
        expect(schema).toMatchSnapshot();
    });
    it('should create an input type with a custom id and update type as fields', async () => {
        let FakeIDDTO = class FakeIDDTO {
        };
        (0, tslib_1.__decorate)([
            (0, src_1.IDField)(() => String),
            (0, tslib_1.__metadata)("design:type", String)
        ], FakeIDDTO.prototype, "id", void 0);
        FakeIDDTO = (0, tslib_1.__decorate)([
            (0, graphql_1.ObjectType)()
        ], FakeIDDTO);
        let UpdateOneCustomId = class UpdateOneCustomId extends (0, src_1.UpdateOneInputType)(FakeIDDTO, FakeUpdateOneType) {
        };
        UpdateOneCustomId = (0, tslib_1.__decorate)([
            (0, graphql_1.InputType)()
        ], UpdateOneCustomId);
        let UpdateOneCustomIdInputTypeSpec = class UpdateOneCustomIdInputTypeSpec {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            updateTest(input) {
                return 1;
            }
        };
        (0, tslib_1.__decorate)([
            (0, graphql_1.Query)(() => graphql_1.Int),
            (0, tslib_1.__param)(0, (0, graphql_1.Args)('input')),
            (0, tslib_1.__metadata)("design:type", Function),
            (0, tslib_1.__metadata)("design:paramtypes", [UpdateOneCustomId]),
            (0, tslib_1.__metadata)("design:returntype", Number)
        ], UpdateOneCustomIdInputTypeSpec.prototype, "updateTest", null);
        UpdateOneCustomIdInputTypeSpec = (0, tslib_1.__decorate)([
            (0, graphql_1.Resolver)()
        ], UpdateOneCustomIdInputTypeSpec);
        const schema = await (0, __fixtures__1.generateSchema)([UpdateOneCustomIdInputTypeSpec]);
        expect(schema).toMatchSnapshot();
    });
    describe('validation', () => {
        it('should validate id is defined is not empty', () => {
            const Type = (0, src_1.UpdateOneInputType)(FakeDTO, FakeUpdateOneType);
            const input = { update: { name: 'hello world' } };
            const it = (0, class_transformer_1.plainToClass)(Type, input);
            const errors = (0, class_validator_1.validateSync)(it);
            expect(errors).toEqual([
                {
                    children: [],
                    constraints: {
                        isNotEmpty: 'id should not be empty',
                    },
                    property: 'id',
                    target: input,
                },
            ]);
        });
        it('should validate id is not empty is defined is not empty', () => {
            const Type = (0, src_1.UpdateOneInputType)(FakeDTO, FakeUpdateOneType);
            const input = { id: '', update: { name: 'hello world' } };
            const it = (0, class_transformer_1.plainToClass)(Type, input);
            const errors = (0, class_validator_1.validateSync)(it);
            expect(errors).toEqual([
                {
                    children: [],
                    constraints: {
                        isNotEmpty: 'id should not be empty',
                    },
                    property: 'id',
                    target: input,
                    value: input.id,
                },
            ]);
        });
        it('should validate the update input', () => {
            const Type = (0, src_1.UpdateOneInputType)(FakeDTO, FakeUpdateOneType);
            const input = { id: 'id-1', update: {} };
            const it = (0, class_transformer_1.plainToClass)(Type, input);
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
                    target: it,
                    value: it.update,
                },
            ]);
        });
    });
});
//# sourceMappingURL=update-one-input.type.spec.js.map