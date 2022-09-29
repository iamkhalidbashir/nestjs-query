"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindOneArgsType = void 0;
const tslib_1 = require("tslib");
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
const common_1 = require("../common");
/**
 * The input type for delete one endpoints.
 */
// eslint-disable-next-line @typescript-eslint/no-redeclare -- intentional
function FindOneArgsType(DTOClass) {
    const IDType = (0, common_1.getDTOIdTypeOrDefault)([DTOClass]);
    let FindOneArgs = class FindOneArgs {
    };
    (0, tslib_1.__decorate)([
        (0, class_validator_1.IsNotEmpty)(),
        (0, graphql_1.Field)(() => IDType, { description: 'The id of the record to find.' }),
        (0, tslib_1.__metadata)("design:type", Object)
    ], FindOneArgs.prototype, "id", void 0);
    FindOneArgs = (0, tslib_1.__decorate)([
        (0, graphql_1.ArgsType)()
    ], FindOneArgs);
    return FindOneArgs;
}
exports.FindOneArgsType = FindOneArgsType;
//# sourceMappingURL=find-one-args.type.js.map