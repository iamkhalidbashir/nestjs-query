"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
// eslint-disable-next-line max-classes-per-file
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const graphql_1 = require("@nestjs/graphql");
const src_1 = require("../../src");
const __fixtures__1 = require("../__fixtures__");
describe('RelationInputType', () => {
    let ParentDTO = class ParentDTO {
    };
    (0, tslib_1.__decorate)([
        (0, src_1.FilterableField)(),
        (0, tslib_1.__metadata)("design:type", String)
    ], ParentDTO.prototype, "field", void 0);
    ParentDTO = (0, tslib_1.__decorate)([
        (0, graphql_1.ObjectType)()
    ], ParentDTO);
    let ParentCustomIDDTO = class ParentCustomIDDTO {
    };
    (0, tslib_1.__decorate)([
        (0, src_1.IDField)(() => String),
        (0, tslib_1.__metadata)("design:type", String)
    ], ParentCustomIDDTO.prototype, "id", void 0);
    ParentCustomIDDTO = (0, tslib_1.__decorate)([
        (0, graphql_1.ObjectType)()
    ], ParentCustomIDDTO);
    let RelationDTO = class RelationDTO {
    };
    (0, tslib_1.__decorate)([
        (0, src_1.FilterableField)(),
        (0, tslib_1.__metadata)("design:type", String)
    ], RelationDTO.prototype, "relationField", void 0);
    RelationDTO = (0, tslib_1.__decorate)([
        (0, graphql_1.ObjectType)()
    ], RelationDTO);
    let RelationCustomIDDTO = class RelationCustomIDDTO {
    };
    (0, tslib_1.__decorate)([
        (0, src_1.IDField)(() => String),
        (0, tslib_1.__metadata)("design:type", String)
    ], RelationCustomIDDTO.prototype, "relationId", void 0);
    RelationCustomIDDTO = (0, tslib_1.__decorate)([
        (0, graphql_1.ObjectType)()
    ], RelationCustomIDDTO);
    let RelationInput = class RelationInput extends (0, src_1.RelationInputType)(ParentDTO, RelationDTO) {
    };
    RelationInput = (0, tslib_1.__decorate)([
        (0, graphql_1.InputType)()
    ], RelationInput);
    it('should create an input type with an id and relationId', async () => {
        let RelationInputTypeSpec = class RelationInputTypeSpec {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            test(input) {
                return 1;
            }
        };
        (0, tslib_1.__decorate)([
            (0, graphql_1.Query)(() => graphql_1.Int),
            (0, tslib_1.__param)(0, (0, graphql_1.Args)('input')),
            (0, tslib_1.__metadata)("design:type", Function),
            (0, tslib_1.__metadata)("design:paramtypes", [RelationInput]),
            (0, tslib_1.__metadata)("design:returntype", Number)
        ], RelationInputTypeSpec.prototype, "test", null);
        RelationInputTypeSpec = (0, tslib_1.__decorate)([
            (0, graphql_1.Resolver)()
        ], RelationInputTypeSpec);
        const schema = await (0, __fixtures__1.generateSchema)([RelationInputTypeSpec]);
        expect(schema).toMatchSnapshot();
    });
    it('should create an input type with a custom id for the parent', async () => {
        let RelationCustomParentIdInput = class RelationCustomParentIdInput extends (0, src_1.RelationInputType)(ParentCustomIDDTO, RelationDTO) {
        };
        RelationCustomParentIdInput = (0, tslib_1.__decorate)([
            (0, graphql_1.InputType)()
        ], RelationCustomParentIdInput);
        let RelationCustomIdInputTypeSpec = class RelationCustomIdInputTypeSpec {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            test(input) {
                return 1;
            }
        };
        (0, tslib_1.__decorate)([
            (0, graphql_1.Query)(() => graphql_1.Int),
            (0, tslib_1.__param)(0, (0, graphql_1.Args)('input')),
            (0, tslib_1.__metadata)("design:type", Function),
            (0, tslib_1.__metadata)("design:paramtypes", [RelationCustomParentIdInput]),
            (0, tslib_1.__metadata)("design:returntype", Number)
        ], RelationCustomIdInputTypeSpec.prototype, "test", null);
        RelationCustomIdInputTypeSpec = (0, tslib_1.__decorate)([
            (0, graphql_1.Resolver)()
        ], RelationCustomIdInputTypeSpec);
        const schema = await (0, __fixtures__1.generateSchema)([RelationCustomIdInputTypeSpec]);
        expect(schema).toMatchSnapshot();
    });
    it('should create an input type with a custom id for the relation', async () => {
        let RelationCustomRelationIdInput = class RelationCustomRelationIdInput extends (0, src_1.RelationInputType)(ParentDTO, RelationCustomIDDTO) {
        };
        RelationCustomRelationIdInput = (0, tslib_1.__decorate)([
            (0, graphql_1.InputType)()
        ], RelationCustomRelationIdInput);
        let RelationCustomIdInputTypeSpec = class RelationCustomIdInputTypeSpec {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            test(input) {
                return 1;
            }
        };
        (0, tslib_1.__decorate)([
            (0, graphql_1.Query)(() => graphql_1.Int),
            (0, tslib_1.__param)(0, (0, graphql_1.Args)('input')),
            (0, tslib_1.__metadata)("design:type", Function),
            (0, tslib_1.__metadata)("design:paramtypes", [RelationCustomRelationIdInput]),
            (0, tslib_1.__metadata)("design:returntype", Number)
        ], RelationCustomIdInputTypeSpec.prototype, "test", null);
        RelationCustomIdInputTypeSpec = (0, tslib_1.__decorate)([
            (0, graphql_1.Resolver)()
        ], RelationCustomIdInputTypeSpec);
        const schema = await (0, __fixtures__1.generateSchema)([RelationCustomIdInputTypeSpec]);
        expect(schema).toMatchSnapshot();
    });
    it('should create an input type with a custom id for the parent and relation', async () => {
        let RelationCustomParentAndRelationIdInput = class RelationCustomParentAndRelationIdInput extends (0, src_1.RelationInputType)(ParentCustomIDDTO, RelationCustomIDDTO) {
        };
        RelationCustomParentAndRelationIdInput = (0, tslib_1.__decorate)([
            (0, graphql_1.InputType)()
        ], RelationCustomParentAndRelationIdInput);
        let RelationCustomIdInputTypeSpec = class RelationCustomIdInputTypeSpec {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            test(input) {
                return 1;
            }
        };
        (0, tslib_1.__decorate)([
            (0, graphql_1.Query)(() => graphql_1.Int),
            (0, tslib_1.__param)(0, (0, graphql_1.Args)('input')),
            (0, tslib_1.__metadata)("design:type", Function),
            (0, tslib_1.__metadata)("design:paramtypes", [RelationCustomParentAndRelationIdInput]),
            (0, tslib_1.__metadata)("design:returntype", Number)
        ], RelationCustomIdInputTypeSpec.prototype, "test", null);
        RelationCustomIdInputTypeSpec = (0, tslib_1.__decorate)([
            (0, graphql_1.Resolver)()
        ], RelationCustomIdInputTypeSpec);
        const schema = await (0, __fixtures__1.generateSchema)([RelationCustomIdInputTypeSpec]);
        expect(schema).toMatchSnapshot();
    });
    it('should return the input when accessing the update field', () => {
        const input = { id: 1, relationId: 2 };
        const it = (0, class_transformer_1.plainToClass)(RelationInput, input);
        expect(it.id).toEqual(input.id);
        expect(it.relationId).toEqual(input.relationId);
    });
    describe('validation', () => {
        it('should validate the id is defined', () => {
            const input = { relationId: 1 };
            const it = (0, class_transformer_1.plainToClass)(RelationInput, input);
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
            const input = { id: '', relationId: 1 };
            const it = (0, class_transformer_1.plainToClass)(RelationInput, input);
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
        it('should validate that relationId is defined', () => {
            const input = { id: 1 };
            const it = (0, class_transformer_1.plainToClass)(RelationInput, input);
            const errors = (0, class_validator_1.validateSync)(it);
            expect(errors).toEqual([
                {
                    children: [],
                    constraints: {
                        isNotEmpty: 'relationId should not be empty',
                    },
                    property: 'relationId',
                    target: input,
                },
            ]);
        });
        it('should validate that relationId is not empty', () => {
            const input = { id: 1, relationId: '' };
            const it = (0, class_transformer_1.plainToClass)(RelationInput, input);
            const errors = (0, class_validator_1.validateSync)(it);
            expect(errors).toEqual([
                {
                    children: [],
                    constraints: {
                        isNotEmpty: 'relationId should not be empty',
                    },
                    property: 'relationId',
                    target: input,
                    value: input.relationId,
                },
            ]);
        });
    });
});
//# sourceMappingURL=relation-input.type.spec.js.map