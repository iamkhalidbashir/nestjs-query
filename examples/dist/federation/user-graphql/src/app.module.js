"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("@nestjs/typeorm");
const helpers_1 = require("../../../helpers");
const user_module_1 = require("./user/user.module");
let AppModule = class AppModule {
};
AppModule = (0, tslib_1.__decorate)([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot((0, helpers_1.typeormOrmConfig)('federation_user')),
            graphql_1.GraphQLFederationModule.forRoot({
                autoSchemaFile: 'schema.gql',
            }),
            user_module_1.UserModule,
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map