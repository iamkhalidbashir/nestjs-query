"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
let AppModule = class AppModule {
};
AppModule = (0, tslib_1.__decorate)([
    (0, common_1.Module)({
        imports: [
            graphql_1.GraphQLGatewayModule.forRoot({
                server: {
                    // ... Apollo server options
                    cors: true,
                },
                gateway: {
                    serviceList: [
                        { name: 'todo-items', url: 'http://localhost:3001/graphql' },
                        { name: 'sub-tasks', url: 'http://localhost:3002/graphql' },
                        { name: 'tags', url: 'http://localhost:3003/graphql' },
                        { name: 'user', url: 'http://localhost:3004/graphql' },
                    ],
                },
            }),
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map