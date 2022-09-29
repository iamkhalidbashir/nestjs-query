"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSubscriptionEventName = exports.createSubscriptionFilter = exports.transformAndValidate = void 0;
const core_1 = require("@nestjs-query/core");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const common_1 = require("@nestjs/common");
/** @internal */
const transformAndValidate = async (TClass, partial) => {
    if (partial instanceof TClass) {
        return partial;
    }
    const transformed = (0, class_transformer_1.plainToClass)(TClass, partial);
    const validationErrors = await (0, class_validator_1.validate)(transformed);
    if (validationErrors.length) {
        throw new common_1.BadRequestException(validationErrors);
    }
    return transformed;
};
exports.transformAndValidate = transformAndValidate;
const createSubscriptionFilter = (InputClass, payloadKey) => 
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async (payload, variables) => {
    const { input } = variables;
    if (input) {
        const args = await (0, exports.transformAndValidate)(InputClass, input);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        const dto = payload[payloadKey];
        return (0, core_1.applyFilter)(dto, args.filter || {});
    }
    return true;
};
exports.createSubscriptionFilter = createSubscriptionFilter;
function getSubscriptionEventName(eventName, authorizeFilter) {
    return authorizeFilter ? `${eventName}-${JSON.stringify(authorizeFilter)}` : eventName;
}
exports.getSubscriptionEventName = getSubscriptionEventName;
//# sourceMappingURL=helpers.js.map