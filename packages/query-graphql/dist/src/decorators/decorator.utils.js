"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.composeDecorators = void 0;
function composeDecorators(...decorators) {
    // eslint-disable-next-line @typescript-eslint/ban-types
    return (
    // eslint-disable-next-line @typescript-eslint/ban-types
    target, propertyKey, descriptorOrIndex) => {
        decorators.forEach((decorator) => {
            if (target instanceof Function && !descriptorOrIndex) {
                return decorator(target);
            }
            if (typeof descriptorOrIndex === 'number') {
                return decorator(target, propertyKey, descriptorOrIndex);
            }
            return decorator(target, propertyKey, descriptorOrIndex);
        });
    };
}
exports.composeDecorators = composeDecorators;
//# sourceMappingURL=decorator.utils.js.map