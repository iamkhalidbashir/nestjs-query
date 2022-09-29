"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeRelationOpts = exports.flattenRelations = void 0;
const tslib_1 = require("tslib");
const lodash_omit_1 = (0, tslib_1.__importDefault)(require("lodash.omit"));
const flattenRelations = (relationOptions) => Object.keys(relationOptions).map((name) => ({ dtoName: name, ...relationOptions[name] }));
exports.flattenRelations = flattenRelations;
const removeRelationOpts = (opts) => (0, lodash_omit_1.default)(opts, 'DTO', 'keys', 'nullable', 'dtoName', 'relationName', 'disableRead', 'disableUpdate', 'disableRemove');
exports.removeRelationOpts = removeRelationOpts;
//# sourceMappingURL=helpers.js.map