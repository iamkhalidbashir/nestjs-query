"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isNamed = void 0;
// eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/explicit-module-boundary-types
const isNamed = (SomeType) => 
// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
'name' in SomeType && typeof SomeType.name === 'string';
exports.isNamed = isNamed;
//# sourceMappingURL=misc.utils.js.map