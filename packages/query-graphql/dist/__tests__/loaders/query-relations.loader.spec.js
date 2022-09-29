"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ts_mockito_1 = require("ts-mockito");
const loader_1 = require("../../src/loader");
describe('QueryRelationsLoader', () => {
    describe('createLoader', () => {
        class DTO {
        }
        class RelationDTO {
        }
        it('should return a function that accepts queryargs', () => {
            const service = (0, ts_mockito_1.mock)();
            const queryRelationsLoader = new loader_1.QueryRelationsLoader(RelationDTO, 'relation');
            expect(queryRelationsLoader.createLoader((0, ts_mockito_1.instance)(service))).toBeInstanceOf(Function);
        });
        it('should try to load the relations with the query args', () => {
            const service = (0, ts_mockito_1.mock)();
            const queryRelationsLoader = new loader_1.QueryRelationsLoader(RelationDTO, 'relation').createLoader((0, ts_mockito_1.instance)(service));
            const dtos = [{ id: 'dto-1' }, { id: 'dto-2' }];
            const dto1Relations = [{ id: 'relation-1' }, { id: 'relation-2' }];
            const dto2Relations = [{ id: 'relation-3' }, { id: 'relation-4' }];
            (0, ts_mockito_1.when)(service.queryRelations(RelationDTO, 'relation', (0, ts_mockito_1.deepEqual)(dtos), (0, ts_mockito_1.deepEqual)({}))).thenResolve(new Map([
                [dtos[0], dto1Relations],
                [dtos[1], dto2Relations],
            ]));
            return expect(queryRelationsLoader([
                { dto: dtos[0], query: {} },
                { dto: dtos[1], query: {} },
            ])).resolves.toEqual([dto1Relations, dto2Relations]);
        });
        it('should try return an empty array for each dto is no results are found', () => {
            const service = (0, ts_mockito_1.mock)();
            const queryRelationsLoader = new loader_1.QueryRelationsLoader(RelationDTO, 'relation').createLoader((0, ts_mockito_1.instance)(service));
            const dtos = [{ id: 'dto-1' }, { id: 'dto-2' }];
            const dto1Relations = [{ id: 'relation-1' }, { id: 'relation-2' }];
            (0, ts_mockito_1.when)(service.queryRelations(RelationDTO, 'relation', (0, ts_mockito_1.deepEqual)(dtos), (0, ts_mockito_1.deepEqual)({}))).thenResolve(new Map([[dtos[0], dto1Relations]]));
            return expect(queryRelationsLoader([
                { dto: dtos[0], query: {} },
                { dto: dtos[1], query: {} },
            ])).resolves.toEqual([dto1Relations, []]);
        });
        it('should group queryRelations calls by query and return in the correct order', () => {
            const service = (0, ts_mockito_1.mock)();
            const queryRelationsLoader = new loader_1.QueryRelationsLoader(RelationDTO, 'relation').createLoader((0, ts_mockito_1.instance)(service));
            const dtos = [{ id: 'dto-1' }, { id: 'dto-2' }, { id: 'dto-3' }, { id: 'dto-4' }];
            const dto1Relations = [{ id: 'relation-1' }, { id: 'relation-2' }];
            const dto2Relations = [{ id: 'relation-3' }, { id: 'relation-4' }];
            const dto3Relations = [{ id: 'relation-5' }, { id: 'relation-6' }];
            const dto4Relations = [{ id: 'relation-7' }, { id: 'relation-8' }];
            (0, ts_mockito_1.when)(service.queryRelations(RelationDTO, 'relation', (0, ts_mockito_1.deepEqual)([dtos[0], dtos[2]]), (0, ts_mockito_1.deepEqual)({ paging: { limit: 10 } }))).thenResolve(new Map([
                [dtos[0], dto1Relations],
                [dtos[2], dto3Relations],
            ]));
            (0, ts_mockito_1.when)(service.queryRelations(RelationDTO, 'relation', (0, ts_mockito_1.deepEqual)([dtos[1], dtos[3]]), (0, ts_mockito_1.deepEqual)({}))).thenResolve(new Map([
                [dtos[1], dto2Relations],
                [dtos[3], dto4Relations],
            ]));
            return expect(queryRelationsLoader([
                { dto: dtos[0], query: { paging: { limit: 10 } } },
                { dto: dtos[1], query: {} },
                { dto: dtos[2], query: { paging: { limit: 10 } } },
                { dto: dtos[3], query: {} },
            ])).resolves.toEqual([dto1Relations, dto2Relations, dto3Relations, dto4Relations]);
        });
    });
});
//# sourceMappingURL=query-relations.loader.spec.js.map