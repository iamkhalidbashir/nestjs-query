"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = void 0;
const tslib_1 = require("tslib");
const query_graphql_1 = require("@nestjs-query/query-graphql");
const query_typeorm_1 = require("@nestjs-query/query-typeorm");
const common_1 = require("@nestjs/common");
const constants_1 = require("../constants");
const user_input_dto_1 = require("./dto/user-input.dto");
const user_dto_1 = require("./dto/user.dto");
const user_entity_1 = require("./user.entity");
let UserModule = class UserModule {
};
UserModule = (0, tslib_1.__decorate)([
    (0, common_1.Module)({
        imports: [
            query_graphql_1.NestjsQueryGraphQLModule.forFeature({
                imports: [query_typeorm_1.NestjsQueryTypeOrmModule.forFeature([user_entity_1.UserEntity], constants_1.USER_CONNECTION)],
                resolvers: [
                    {
                        DTOClass: user_dto_1.UserDTO,
                        EntityClass: user_entity_1.UserEntity,
                        CreateDTOClass: user_input_dto_1.UserInputDTO,
                        UpdateDTOClass: user_input_dto_1.UserInputDTO,
                    },
                ],
            }),
        ],
    })
], UserModule);
exports.UserModule = UserModule;
//# sourceMappingURL=user.module.js.map