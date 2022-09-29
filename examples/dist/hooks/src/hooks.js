"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatedByHook = exports.CreatedByHook = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth/auth.service");
const helpers_1 = require("./auth/helpers");
let CreatedByHook = class CreatedByHook {
    constructor(authService) {
        this.authService = authService;
    }
    async run(instance, context) {
        const createdBy = await this.authService.getUserEmail((0, helpers_1.getUserName)(context));
        if (Array.isArray(instance.input)) {
            // eslint-disable-next-line no-param-reassign
            instance.input = instance.input.map((c) => ({ ...c, createdBy }));
            return instance;
        }
        // eslint-disable-next-line no-param-reassign
        instance.input.createdBy = createdBy;
        return instance;
    }
};
CreatedByHook = (0, tslib_1.__decorate)([
    (0, common_1.Injectable)(),
    (0, tslib_1.__metadata)("design:paramtypes", [auth_service_1.AuthService])
], CreatedByHook);
exports.CreatedByHook = CreatedByHook;
let UpdatedByHook = class UpdatedByHook {
    constructor(authService) {
        this.authService = authService;
    }
    async run(instance, context) {
        // eslint-disable-next-line no-param-reassign
        instance.update.updatedBy = await this.authService.getUserEmail((0, helpers_1.getUserName)(context));
        return instance;
    }
};
UpdatedByHook = (0, tslib_1.__decorate)([
    (0, common_1.Injectable)(),
    (0, tslib_1.__metadata)("design:paramtypes", [auth_service_1.AuthService])
], UpdatedByHook);
exports.UpdatedByHook = UpdatedByHook;
//# sourceMappingURL=hooks.js.map