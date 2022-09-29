"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CannotUseWithout = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
/** @internal */
let CannotUseWithout = class CannotUseWithout {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/explicit-module-boundary-types
    validate(value, args) {
        const object = args.object;
        const required = args.constraints[0];
        return object[required] !== undefined;
    }
    defaultMessage(args) {
        return `Cannot be used without \`${args.constraints[0]}\`.`;
    }
};
CannotUseWithout = (0, tslib_1.__decorate)([
    (0, class_validator_1.ValidatorConstraint)({ async: false })
], CannotUseWithout);
exports.CannotUseWithout = CannotUseWithout;
//# sourceMappingURL=cannot-use-without.validator.js.map