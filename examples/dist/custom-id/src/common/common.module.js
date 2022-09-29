"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommonModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const custom_id_scalar_1 = require("./custom-id.scalar");
let CommonModule = class CommonModule {
};
CommonModule = (0, tslib_1.__decorate)([
    (0, common_1.Module)({
        providers: [custom_id_scalar_1.CustomIDScalar],
    })
], CommonModule);
exports.CommonModule = CommonModule;
//# sourceMappingURL=common.module.js.map