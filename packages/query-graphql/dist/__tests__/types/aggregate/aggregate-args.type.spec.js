"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
// eslint-disable-next-line max-classes-per-file
const graphql_1 = require("@nestjs/graphql");
const src_1 = require("../../../src");
const __fixtures__1 = require("../../__fixtures__");
describe('AggregateArgsType', () => {
    let FakeType = class FakeType {
    };
    (0, tslib_1.__decorate)([
        (0, src_1.FilterableField)(),
        (0, tslib_1.__metadata)("design:type", String)
    ], FakeType.prototype, "stringField", void 0);
    (0, tslib_1.__decorate)([
        (0, src_1.FilterableField)(),
        (0, tslib_1.__metadata)("design:type", Number)
    ], FakeType.prototype, "numberField", void 0);
    (0, tslib_1.__decorate)([
        (0, src_1.FilterableField)(),
        (0, tslib_1.__metadata)("design:type", Boolean)
    ], FakeType.prototype, "boolField", void 0);
    (0, tslib_1.__decorate)([
        (0, src_1.FilterableField)(() => graphql_1.GraphQLISODateTime),
        (0, tslib_1.__metadata)("design:type", Date)
    ], FakeType.prototype, "dateField", void 0);
    FakeType = (0, tslib_1.__decorate)([
        (0, graphql_1.ObjectType)()
    ], FakeType);
    let AggArgs = class AggArgs extends (0, src_1.AggregateArgsType)(FakeType) {
    };
    AggArgs = (0, tslib_1.__decorate)([
        (0, graphql_1.ArgsType)()
    ], AggArgs);
    it('should create an aggregate type with the correct fields for each type', async () => {
        let AggregateArgsTypeSpec = class AggregateArgsTypeSpec {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            aggregate(args) {
                return 1;
            }
        };
        (0, tslib_1.__decorate)([
            (0, graphql_1.Query)(() => graphql_1.Int),
            (0, tslib_1.__param)(0, (0, graphql_1.Args)()),
            (0, tslib_1.__metadata)("design:type", Function),
            (0, tslib_1.__metadata)("design:paramtypes", [AggArgs]),
            (0, tslib_1.__metadata)("design:returntype", Number)
        ], AggregateArgsTypeSpec.prototype, "aggregate", null);
        AggregateArgsTypeSpec = (0, tslib_1.__decorate)([
            (0, graphql_1.Resolver)()
        ], AggregateArgsTypeSpec);
        const schema = await (0, __fixtures__1.generateSchema)([AggregateArgsTypeSpec]);
        expect(schema).toMatchSnapshot();
    });
});
//# sourceMappingURL=aggregate-args.type.spec.js.map