"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const graphql_1 = require("@nestjs/graphql");
const types_1 = require("../../src/types");
const __fixtures__1 = require("../__fixtures__");
describe('MutationArgsType', () => {
    let FakeType = class FakeType {
    };
    (0, tslib_1.__decorate)([
        (0, graphql_1.Field)(),
        (0, tslib_1.__metadata)("design:type", String)
    ], FakeType.prototype, "foo", void 0);
    FakeType = (0, tslib_1.__decorate)([
        (0, graphql_1.InputType)()
    ], FakeType);
    let MutationArgs = class MutationArgs extends (0, types_1.MutationArgsType)(FakeType) {
    };
    MutationArgs = (0, tslib_1.__decorate)([
        (0, graphql_1.ArgsType)()
    ], MutationArgs);
    beforeEach(() => jest.clearAllMocks());
    it('should create an args type with an array field', async () => {
        let MutationArgsTypeSpec = class MutationArgsTypeSpec {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            test(input) {
                return 1;
            }
        };
        (0, tslib_1.__decorate)([
            (0, graphql_1.Query)(() => graphql_1.Int),
            (0, tslib_1.__param)(0, (0, graphql_1.Args)()),
            (0, tslib_1.__metadata)("design:type", Function),
            (0, tslib_1.__metadata)("design:paramtypes", [MutationArgs]),
            (0, tslib_1.__metadata)("design:returntype", Number)
        ], MutationArgsTypeSpec.prototype, "test", null);
        MutationArgsTypeSpec = (0, tslib_1.__decorate)([
            (0, graphql_1.Resolver)()
        ], MutationArgsTypeSpec);
        const schema = await (0, __fixtures__1.generateSchema)([MutationArgsTypeSpec]);
        expect(schema).toMatchSnapshot();
    });
});
//# sourceMappingURL=mutation-args.type.spec.js.map