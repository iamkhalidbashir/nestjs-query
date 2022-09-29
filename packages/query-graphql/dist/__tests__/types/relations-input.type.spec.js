"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
// eslint-disable-next-line max-classes-per-file
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const graphql_1 = require("@nestjs/graphql");
const src_1 = require("../../src");
const __fixtures__1 = require("../__fixtures__");
describe('RelationsInputType', () => {
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
    let RelationsInput = class RelationsInput extends (0, src_1.RelationsInputType)(ParentDTO, RelationDTO) {
    };
    RelationsInput = (0, tslib_1.__decorate)([
        (0, graphql_1.InputType)()
    ], RelationsInput);
    it('should create an input type with an id and relationIds fields', async () => {
        let RelationsInputTypeSpec = class RelationsInputTypeSpec {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            test(input) {
                return 1;
            }
        };
        (0, tslib_1.__decorate)([
            (0, graphql_1.Query)(() => graphql_1.Int),
            (0, tslib_1.__param)(0, (0, graphql_1.Args)('input')),
            (0, tslib_1.__metadata)("design:type", Function),
            (0, tslib_1.__metadata)("design:paramtypes", [RelationsInput]),
            (0, tslib_1.__metadata)("design:returntype", Number)
        ], RelationsInputTypeSpec.prototype, "test", null);
        RelationsInputTypeSpec = (0, tslib_1.__decorate)([
            (0, graphql_1.Resolver)()
        ], RelationsInputTypeSpec);
        const schema = await (0, __fixtures__1.generateSchema)([RelationsInputTypeSpec]);
        expect(schema).toMatchSnapshot();
    });
    it('should create an input type with a custom parent id', async () => {
        let RelationsCustomParentIdInput = class RelationsCustomParentIdInput extends (0, src_1.RelationsInputType)(ParentCustomIDDTO, RelationDTO) {
        };
        RelationsCustomParentIdInput = (0, tslib_1.__decorate)([
            (0, graphql_1.InputType)()
        ], RelationsCustomParentIdInput);
        let RelationsCustomIdInputTypeSpec = class RelationsCustomIdInputTypeSpec {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            test(input) {
                return 1;
            }
        };
        (0, tslib_1.__decorate)([
            (0, graphql_1.Query)(() => graphql_1.Int),
            (0, tslib_1.__param)(0, (0, graphql_1.Args)('input')),
            (0, tslib_1.__metadata)("design:type", Function),
            (0, tslib_1.__metadata)("design:paramtypes", [RelationsCustomParentIdInput]),
            (0, tslib_1.__metadata)("design:returntype", Number)
        ], RelationsCustomIdInputTypeSpec.prototype, "test", null);
        RelationsCustomIdInputTypeSpec = (0, tslib_1.__decorate)([
            (0, graphql_1.Resolver)()
        ], RelationsCustomIdInputTypeSpec);
        const schema = await (0, __fixtures__1.generateSchema)([RelationsCustomIdInputTypeSpec]);
        expect(schema).toMatchSnapshot();
    });
    it('should create an input type with a custom relation id', async () => {
        let RelationsCustomRelationIdInput = class RelationsCustomRelationIdInput extends (0, src_1.RelationsInputType)(ParentDTO, RelationCustomIDDTO) {
        };
        RelationsCustomRelationIdInput = (0, tslib_1.__decorate)([
            (0, graphql_1.InputType)()
        ], RelationsCustomRelationIdInput);
        let RelationsCustomIdInputTypeSpec = class RelationsCustomIdInputTypeSpec {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            test(input) {
                return 1;
            }
        };
        (0, tslib_1.__decorate)([
            (0, graphql_1.Query)(() => graphql_1.Int),
            (0, tslib_1.__param)(0, (0, graphql_1.Args)('input')),
            (0, tslib_1.__metadata)("design:type", Function),
            (0, tslib_1.__metadata)("design:paramtypes", [RelationsCustomRelationIdInput]),
            (0, tslib_1.__metadata)("design:returntype", Number)
        ], RelationsCustomIdInputTypeSpec.prototype, "test", null);
        RelationsCustomIdInputTypeSpec = (0, tslib_1.__decorate)([
            (0, graphql_1.Resolver)()
        ], RelationsCustomIdInputTypeSpec);
        const schema = await (0, __fixtures__1.generateSchema)([RelationsCustomIdInputTypeSpec]);
        expect(schema).toMatchSnapshot();
    });
    it('should create an input type with a custom parent and relation id', async () => {
        let RelationsCustomParentRelationIdInput = class RelationsCustomParentRelationIdInput extends (0, src_1.RelationsInputType)(ParentCustomIDDTO, RelationCustomIDDTO) {
        };
        RelationsCustomParentRelationIdInput = (0, tslib_1.__decorate)([
            (0, graphql_1.InputType)()
        ], RelationsCustomParentRelationIdInput);
        let RelationsCustomIdInputTypeSpec = class RelationsCustomIdInputTypeSpec {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            test(input) {
                return 1;
            }
        };
        (0, tslib_1.__decorate)([
            (0, graphql_1.Query)(() => graphql_1.Int),
            (0, tslib_1.__param)(0, (0, graphql_1.Args)('input')),
            (0, tslib_1.__metadata)("design:type", Function),
            (0, tslib_1.__metadata)("design:paramtypes", [RelationsCustomParentRelationIdInput]),
            (0, tslib_1.__metadata)("design:returntype", Number)
        ], RelationsCustomIdInputTypeSpec.prototype, "test", null);
        RelationsCustomIdInputTypeSpec = (0, tslib_1.__decorate)([
            (0, graphql_1.Resolver)()
        ], RelationsCustomIdInputTypeSpec);
        const schema = await (0, __fixtures__1.generateSchema)([RelationsCustomIdInputTypeSpec]);
        expect(schema).toMatchSnapshot();
    });
    it('should return the input when accessing the update field', () => {
        const input = { id: 1, relationIds: [2, 3, 4] };
        const it = (0, class_transformer_1.plainToClass)(RelationsInput, input);
        expect(it.id).toEqual(input.id);
        expect(it.relationIds).toEqual(input.relationIds);
    });
    describe('validation', () => {
        it('should validate the id is defined', () => {
            const input = { relationIds: [2, 3, 4] };
            const it = (0, class_transformer_1.plainToClass)(RelationsInput, input);
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
            const input = { id: '', relationIds: [2, 3, 4] };
            const it = (0, class_transformer_1.plainToClass)(RelationsInput, input);
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
        it('should allow an empty relationIds array', () => {
            const input = { id: 1, relationIds: [] };
            const it = (0, class_transformer_1.plainToClass)(RelationsInput, input);
            const errors = (0, class_validator_1.validateSync)(it);
            expect(errors).toEqual([]);
        });
        it('should validate that relationsIds is unique', () => {
            const input = { id: 1, relationIds: [1, 2, 1, 2] };
            const it = (0, class_transformer_1.plainToClass)(RelationsInput, input);
            const errors = (0, class_validator_1.validateSync)(it);
            expect(errors).toEqual([
                {
                    children: [],
                    constraints: {
                        arrayUnique: "All relationIds's elements must be unique",
                    },
                    property: 'relationIds',
                    target: input,
                    value: input.relationIds,
                },
            ]);
        });
        it('should validate that relationsIds does not contain an empty id', () => {
            const input = { id: 1, relationIds: [''] };
            const it = (0, class_transformer_1.plainToClass)(RelationsInput, input);
            const errors = (0, class_validator_1.validateSync)(it);
            expect(errors).toEqual([
                {
                    children: [],
                    constraints: {
                        isNotEmpty: 'each value in relationIds should not be empty',
                    },
                    property: 'relationIds',
                    target: input,
                    value: input.relationIds,
                },
            ]);
        });
    });
});
//# sourceMappingURL=relations-input.type.spec.js.map