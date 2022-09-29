"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubTaskModule = void 0;
const tslib_1 = require("tslib");
const query_graphql_1 = require("@nestjs-query/query-graphql");
const common_1 = require("@nestjs/common");
const query_mongoose_1 = require("@nestjs-query/query-mongoose");
const sub_task_dto_1 = require("./dto/sub-task.dto");
const subtask_input_dto_1 = require("./dto/subtask-input.dto");
const subtask_update_dto_1 = require("./dto/subtask-update.dto");
const sub_task_entity_1 = require("./sub-task.entity");
let SubTaskModule = class SubTaskModule {
};
SubTaskModule = (0, tslib_1.__decorate)([
    (0, common_1.Module)({
        imports: [
            query_graphql_1.NestjsQueryGraphQLModule.forFeature({
                imports: [
                    query_mongoose_1.NestjsQueryMongooseModule.forFeature([
                        { document: sub_task_entity_1.SubTaskEntity, name: sub_task_entity_1.SubTaskEntity.name, schema: sub_task_entity_1.SubTaskEntitySchema },
                    ]),
                ],
                resolvers: [
                    {
                        DTOClass: sub_task_dto_1.SubTaskDTO,
                        EntityClass: sub_task_entity_1.SubTaskEntity,
                        CreateDTOClass: subtask_input_dto_1.CreateSubTaskDTO,
                        UpdateDTOClass: subtask_update_dto_1.SubTaskUpdateDTO,
                        enableAggregate: true,
                    },
                ],
            }),
        ],
    })
], SubTaskModule);
exports.SubTaskModule = SubTaskModule;
//# sourceMappingURL=sub-task.module.js.map