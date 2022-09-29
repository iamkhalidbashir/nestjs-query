"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
// eslint-disable-next-line max-classes-per-file
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const graphql_1 = require("@nestjs/graphql");
const src_1 = require("../../src");
const __fixtures__1 = require("../__fixtures__");
describe('FindOneArgsType', () => {
    let FindOneDTO = class FindOneDTO {
    };
    (0, tslib_1.__decorate)([
        (0, src_1.FilterableField)(),
        (0, tslib_1.__metadata)("design:type", String)
    ], FindOneDTO.prototype, "field", void 0);
    FindOneDTO = (0, tslib_1.__decorate)([
        (0, graphql_1.ObjectType)()
    ], FindOneDTO);
    let FindOne = class FindOne extends (0, src_1.FindOneArgsType)(FindOneDTO) {
    };
    FindOne = (0, tslib_1.__decorate)([
        (0, graphql_1.ArgsType)()
    ], FindOne);
    it('should create an args type with id field as the type', async () => {
        let FindOneArgsTypeSpec = class FindOneArgsTypeSpec {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            test(input) {
                return 1;
            }
        };
        (0, tslib_1.__decorate)([
            (0, graphql_1.Query)(() => graphql_1.Int),
            (0, tslib_1.__param)(0, (0, graphql_1.Args)()),
            (0, tslib_1.__metadata)("design:type", Function),
            (0, tslib_1.__metadata)("design:paramtypes", [FindOne]),
            (0, tslib_1.__metadata)("design:returntype", Number)
        ], FindOneArgsTypeSpec.prototype, "test", null);
        FindOneArgsTypeSpec = (0, tslib_1.__decorate)([
            (0, graphql_1.Resolver)()
        ], FindOneArgsTypeSpec);
        const schema = await (0, __fixtures__1.generateSchema)([FindOneArgsTypeSpec]);
        expect(schema).toMatchSnapshot();
    });
    it('should create an args type with a custom ID type', async () => {
        let FindOneCustomIDDTO = class FindOneCustomIDDTO {
        };
        (0, tslib_1.__decorate)([
            (0, src_1.IDField)(() => String),
            (0, tslib_1.__metadata)("design:type", String)
        ], FindOneCustomIDDTO.prototype, "field", void 0);
        FindOneCustomIDDTO = (0, tslib_1.__decorate)([
            (0, graphql_1.ObjectType)()
        ], FindOneCustomIDDTO);
        let FindOneCustomId = class FindOneCustomId extends (0, src_1.FindOneArgsType)(FindOneCustomIDDTO) {
        };
        FindOneCustomId = (0, tslib_1.__decorate)([
            (0, graphql_1.ArgsType)()
        ], FindOneCustomId);
        let FindOneArgsTypeSpec = class FindOneArgsTypeSpec {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            test(input) {
                return 1;
            }
        };
        (0, tslib_1.__decorate)([
            (0, graphql_1.Query)(() => graphql_1.Int),
            (0, tslib_1.__param)(0, (0, graphql_1.Args)()),
            (0, tslib_1.__metadata)("design:type", Function),
            (0, tslib_1.__metadata)("design:paramtypes", [FindOneCustomId]),
            (0, tslib_1.__metadata)("design:returntype", Number)
        ], FindOneArgsTypeSpec.prototype, "test", null);
        FindOneArgsTypeSpec = (0, tslib_1.__decorate)([
            (0, graphql_1.Resolver)()
        ], FindOneArgsTypeSpec);
        const schema = await (0, __fixtures__1.generateSchema)([FindOneArgsTypeSpec]);
        expect(schema).toMatchSnapshot();
    });
    describe('validation', () => {
        it('should validate the id is defined', () => {
            const input = {};
            const it = (0, class_transformer_1.plainToClass)(FindOne, input);
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
            const it = (0, class_transformer_1.plainToClass)(FindOne, input);
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
//# sourceMappingURL=find-one-args.type.spec.js.map