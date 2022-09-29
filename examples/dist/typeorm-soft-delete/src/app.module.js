"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("@nestjs/typeorm");
const todo_item_module_1 = require("./todo-item/todo-item.module");
const helpers_1 = require("../../helpers");
let AppModule = class AppModule {
};
AppModule = (0, tslib_1.__decorate)([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot((0, helpers_1.typeormOrmConfig)('typeorm_soft_delete')),
            graphql_1.GraphQLModule.forRoot({
                autoSchemaFile: 'schema.gql',
            }),
            todo_item_module_1.TodoItemModule,
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map