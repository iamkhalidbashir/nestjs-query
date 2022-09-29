"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const core_1 = require("@nestjs-query/core");
const graphql_1 = require("@nestjs/graphql");
const decorators_1 = require("../src/decorators");
const providers_1 = require("../src/providers");
describe('createTypeOrmQueryServiceProviders', () => {
    let TestDTO = class TestDTO {
    };
    (0, tslib_1.__decorate)([
        (0, decorators_1.FilterableField)(),
        (0, tslib_1.__metadata)("design:type", String)
    ], TestDTO.prototype, "name", void 0);
    TestDTO = (0, tslib_1.__decorate)([
        (0, graphql_1.ObjectType)()
    ], TestDTO);
    describe('entity crud resolver', () => {
        it('should create a provider for the entity', () => {
            const providers = (0, providers_1.createResolvers)([{ DTOClass: TestDTO, EntityClass: TestDTO }]);
            expect(providers).toHaveLength(1);
            const Provider = providers[0];
            expect(Provider.name).toBe('TestDTOAutoResolver');
            expect(new Provider(core_1.NoOpQueryService.getInstance())).toBeInstanceOf(Provider);
        });
        it('should create a federated provider for the entity', () => {
            class Service extends core_1.NoOpQueryService {
            }
            const providers = (0, providers_1.createResolvers)([{ type: 'federated', DTOClass: TestDTO, Service }]);
            expect(providers).toHaveLength(1);
            const Provider = providers[0];
            expect(Provider.name).toBe('TestDTOFederatedAutoResolver');
            expect(new Provider(core_1.NoOpQueryService.getInstance())).toBeInstanceOf(Provider);
        });
    });
});
//# sourceMappingURL=providers.spec.js.map