"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const mongoose_1 = require("@nestjs/mongoose");
const tag_module_1 = require("./tag/tag.module");
const todo_item_module_1 = require("./todo-item/todo-item.module");
const sub_task_module_1 = require("./sub-task/sub-task.module");
const helpers_1 = require("../../helpers");
const { uri, ...options } = (0, helpers_1.mongooseConfig)('mongoose');
let AppModule = class AppModule {
};
AppModule = (0, tslib_1.__decorate)([
    (0, common_1.Module)({
        imports: [
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            mongoose_1.MongooseModule.forRoot(uri, options),
            graphql_1.GraphQLModule.forRoot({
                autoSchemaFile: 'schema.gql',
                context: ({ req }) => ({ request: req }),
            }),
            sub_task_module_1.SubTaskModule,
            todo_item_module_1.TodoItemModule,
            tag_module_1.TagModule,
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map