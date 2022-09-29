"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = void 0;
const tslib_1 = require("tslib");
const query_typeorm_1 = require("@nestjs-query/query-typeorm");
const common_1 = require("@nestjs/common");
const user_entity_1 = require("./user.entity");
let UserModule = class UserModule {
};
UserModule = (0, tslib_1.__decorate)([
    (0, common_1.Module)({
        imports: [query_typeorm_1.NestjsQueryTypeOrmModule.forFeature([user_entity_1.UserEntity])],
        exports: [query_typeorm_1.NestjsQueryTypeOrmModule.forFeature([user_entity_1.UserEntity])],
    })
], UserModule);
exports.UserModule = UserModule;
//# sourceMappingURL=user.module.js.map