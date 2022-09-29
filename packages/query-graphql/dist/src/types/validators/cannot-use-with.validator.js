"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CannotUseWith = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
/** @internal */
let CannotUseWith = class CannotUseWith {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/explicit-module-boundary-types
    validate(value, args) {
        const object = args.object;
        return args.constraints.every((propertyName) => object[propertyName] === undefined);
    }
    defaultMessage(args) {
        return `Cannot be used with \`${args.constraints.join('` , `')}\`.`;
    }
};
CannotUseWith = (0, tslib_1.__decorate)([
    (0, class_validator_1.ValidatorConstraint)({ async: false })
], CannotUseWith);
exports.CannotUseWith = CannotUseWith;
//# sourceMappingURL=cannot-use-with.validator.js.map