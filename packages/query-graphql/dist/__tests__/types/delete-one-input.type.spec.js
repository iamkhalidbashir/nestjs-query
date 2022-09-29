"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
// eslint-disable-next-line max-classes-per-file
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const graphql_1 = require("@nestjs/graphql");
const src_1 = require("../../src");
const __fixtures__1 = require("../__fixtures__");
describe('DeleteOneInputType', () => {
    let DeleteOneDTO = class DeleteOneDTO {
    };
    (0, tslib_1.__decorate)([
        (0, src_1.FilterableField)(),
        (0, tslib_1.__metadata)("design:type", String)
    ], DeleteOneDTO.prototype, "field", void 0);
    DeleteOneDTO = (0, tslib_1.__decorate)([
        (0, graphql_1.ObjectType)()
    ], DeleteOneDTO);
    let DeleteOne = class DeleteOne extends (0, src_1.DeleteOneInputType)(DeleteOneDTO) {
    };
    DeleteOne = (0, tslib_1.__decorate)([
        (0, graphql_1.InputType)()
    ], DeleteOne);
    it('should create an input type with id field as the type', async () => {
        let DeleteOneInputTypeSpec = class DeleteOneInputTypeSpec {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            test(input) {
                return 1;
            }
        };
        (0, tslib_1.__decorate)([
            (0, graphql_1.Query)(() => graphql_1.Int),
            (0, tslib_1.__param)(0, (0, graphql_1.Args)('input')),
            (0, tslib_1.__metadata)("design:type", Function),
            (0, tslib_1.__metadata)("design:paramtypes", [DeleteOne]),
            (0, tslib_1.__metadata)("design:returntype", Number)
        ], DeleteOneInputTypeSpec.prototype, "test", null);
        DeleteOneInputTypeSpec = (0, tslib_1.__decorate)([
            (0, graphql_1.Resolver)()
        ], DeleteOneInputTypeSpec);
        const schema = await (0, __fixtures__1.generateSchema)([DeleteOneInputTypeSpec]);
        expect(schema).toMatchSnapshot();
    });
    it('should create an input type with a custom ID type', async () => {
        let DeleteOneCustomIDDTO = class DeleteOneCustomIDDTO {
        };
        (0, tslib_1.__decorate)([
            (0, src_1.IDField)(() => String),
            (0, tslib_1.__metadata)("design:type", String)
        ], DeleteOneCustomIDDTO.prototype, "field", void 0);
        DeleteOneCustomIDDTO = (0, tslib_1.__decorate)([
            (0, graphql_1.ObjectType)()
        ], DeleteOneCustomIDDTO);
        let DeleteOneCustomId = class DeleteOneCustomId extends (0, src_1.DeleteOneInputType)(DeleteOneCustomIDDTO) {
        };
        DeleteOneCustomId = (0, tslib_1.__decorate)([
            (0, graphql_1.InputType)()
        ], DeleteOneCustomId);
        let DeleteOneInputTypeSpec = class DeleteOneInputTypeSpec {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            test(input) {
                return 1;
            }
        };
        (0, tslib_1.__decorate)([
            (0, graphql_1.Query)(() => graphql_1.Int),
            (0, tslib_1.__param)(0, (0, graphql_1.Args)('input')),
            (0, tslib_1.__metadata)("design:type", Function),
            (0, tslib_1.__metadata)("design:paramtypes", [DeleteOneCustomId]),
            (0, tslib_1.__metadata)("design:returntype", Number)
        ], DeleteOneInputTypeSpec.prototype, "test", null);
        DeleteOneInputTypeSpec = (0, tslib_1.__decorate)([
            (0, graphql_1.Resolver)()
        ], DeleteOneInputTypeSpec);
        const schema = await (0, __fixtures__1.generateSchema)([DeleteOneInputTypeSpec]);
        expect(schema).toMatchSnapshot();
    });
    describe('validation', () => {
        it('should validate the id is defined', () => {
            const input = {};
            const it = (0, class_transformer_1.plainToClass)(DeleteOne, input);
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
        it('should validate the id is not empty', () => {
            const input = { id: '' };
            const it = (0, class_transformer_1.plainToClass)(DeleteOne, input);
            const errors = (0, class_validator_1.validateSync)(it);
            expect(errors).toEqual([
                {
                    children: [],
                    constraints: {
                        isNotEmpty: 'id should not be empty',
                    },
                    property: 'id',
                    target: input,
                    value: '',
                },
            ]);
        });
    });
});
//# sourceMappingURL=delete-one-input.type.spec.js.map