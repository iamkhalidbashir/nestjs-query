"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnregisteredObjectType = void 0;
/** @internal */
class UnregisteredObjectType extends Error {
    constructor(Cls, description) {
        super(`${description} Ensure ${Cls.name} is annotated with @nestjs/graphql @ObjectType`);
    }
}
exports.UnregisteredObjectType = UnregisteredObjectType;
//# sourceMappingURL=type.errors.js.map