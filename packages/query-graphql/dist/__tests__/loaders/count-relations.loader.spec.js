"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ts_mockito_1 = require("ts-mockito");
const loader_1 = require("../../src/loader");
describe('CountRelationsLoader', () => {
    describe('createLoader', () => {
        class DTO {
        }
        class RelationDTO {
        }
        it('should return a function that accepts a filter', () => {
            const service = (0, ts_mockito_1.mock)();
            const countRelationsLoader = new loader_1.CountRelationsLoader(RelationDTO, 'relation');
            expect(countRelationsLoader.createLoader((0, ts_mockito_1.instance)(service))).toBeInstanceOf(Function);
        });
        it('should try to load the relations with the filter', () => {
            const service = (0, ts_mockito_1.mock)();
            const countRelationsLoader = new loader_1.CountRelationsLoader(RelationDTO, 'relation').createLoader((0, ts_mockito_1.instance)(service));
            const dtos = [{ id: 'dto-1' }, { id: 'dto-2' }];
            (0, ts_mockito_1.when)(service.countRelations(RelationDTO, 'relation', (0, ts_mockito_1.deepEqual)(dtos), (0, ts_mockito_1.deepEqual)({}))).thenResolve(new Map([
                [dtos[0], 1],
                [dtos[1], 2],
            ]));
            return expect(countRelationsLoader([
                { dto: dtos[0], filter: {} },
                { dto: dtos[1], filter: {} },
            ])).resolves.toEqual([1, 2]);
        });
        it('should try return an empty array for each dto is no results are found', () => {
            const service = (0, ts_mockito_1.mock)();
            const countRelationsLoader = new loader_1.CountRelationsLoader(RelationDTO, 'relation').createLoader((0, ts_mockito_1.instance)(service));
            const dtos = [{ id: 'dto-1' }, { id: 'dto-2' }];
            (0, ts_mockito_1.when)(service.countRelations(RelationDTO, 'relation', (0, ts_mockito_1.deepEqual)(dtos), (0, ts_mockito_1.deepEqual)({}))).thenResolve(new Map([[dtos[0], 1]]));
            return expect(countRelationsLoader([
                { dto: dtos[0], filter: {} },
                { dto: dtos[1], filter: {} },
            ])).resolves.toEqual([1, 0]);
        });
        it('should group queryRelations calls by query and return in the correct order', () => {
            const service = (0, ts_mockito_1.mock)();
            const countRelationsLoader = new loader_1.CountRelationsLoader(RelationDTO, 'relation').createLoader((0, ts_mockito_1.instance)(service));
            const dtos = [{ id: 'dto-1' }, { id: 'dto-2' }, { id: 'dto-3' }, { id: 'dto-4' }];
            (0, ts_mockito_1.when)(service.countRelations(RelationDTO, 'relation', (0, ts_mockito_1.deepEqual)([dtos[0], dtos[2]]), (0, ts_mockito_1.deepEqual)({ id: { isNot: null } }))).thenResolve(new Map([
                [dtos[0], 1],
                [dtos[2], 2],
            ]));
            (0, ts_mockito_1.when)(service.countRelations(RelationDTO, 'relation', (0, ts_mockito_1.deepEqual)([dtos[1], dtos[3]]), (0, ts_mockito_1.deepEqual)({}))).thenResolve(new Map([
                [dtos[1], 3],
                [dtos[3], 4],
            ]));
            return expect(countRelationsLoader([
                { dto: dtos[0], filter: { id: { isNot: null } } },
                { dto: dtos[1], filter: {} },
                { dto: dtos[2], filter: { id: { isNot: null } } },
                { dto: dtos[3], filter: {} },
            ])).resolves.toEqual([1, 3, 2, 4]);
        });
    });
});
//# sourceMappingURL=count-relations.loader.spec.js.map