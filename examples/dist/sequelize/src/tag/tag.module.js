"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagModule = void 0;
const tslib_1 = require("tslib");
const query_graphql_1 = require("@nestjs-query/query-graphql");
const query_sequelize_1 = require("@nestjs-query/query-sequelize");
const common_1 = require("@nestjs/common");
const tag_input_dto_1 = require("./dto/tag-input.dto");
const tag_dto_1 = require("./dto/tag.dto");
const tag_entity_1 = require("./tag.entity");
let TagModule = class TagModule {
};
TagModule = (0, tslib_1.__decorate)([
    (0, common_1.Module)({
        imports: [
            query_graphql_1.NestjsQueryGraphQLModule.forFeature({
                imports: [query_sequelize_1.NestjsQuerySequelizeModule.forFeature([tag_entity_1.TagEntity])],
                resolvers: [
                    {
                        DTOClass: tag_dto_1.TagDTO,
                        EntityClass: tag_entity_1.TagEntity,
                        CreateDTOClass: tag_input_dto_1.TagInputDTO,
                        UpdateDTOClass: tag_input_dto_1.TagInputDTO,
                        enableAggregate: true,
                    },
                ],
            }),
        ],
    })
], TagModule);
exports.TagModule = TagModule;
//# sourceMappingURL=tag.module.js.map