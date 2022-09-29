"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("@nestjs/typeorm");
const sub_task_module_1 = require("./sub-task/sub-task.module");
const helpers_1 = require("../../../helpers");
let AppModule = class AppModule {
};
AppModule = (0, tslib_1.__decorate)([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot((0, helpers_1.typeormOrmConfig)('federation_sub_task')),
            graphql_1.GraphQLFederationModule.forRoot({
                autoSchemaFile: 'schema.gql',
            }),
            sub_task_module_1.SubTaskModule,
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map