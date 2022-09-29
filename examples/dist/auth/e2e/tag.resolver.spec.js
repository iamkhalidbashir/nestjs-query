"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const core_1 = require("@nestjs-query/core");
const testing_1 = require("@nestjs/testing");
const supertest_1 = (0, tslib_1.__importDefault)(require("supertest"));
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const app_module_1 = require("../src/app.module");
const fixtures_1 = require("./fixtures");
const graphql_fragments_1 = require("./graphql-fragments");
const tag_entity_1 = require("../src/tag/tag.entity");
const auth_service_1 = require("../src/auth/auth.service");
describe('TagResolver (auth - e2e)', () => {
    let app;
    let jwtToken;
    beforeAll(async () => {
        const moduleRef = await testing_1.Test.createTestingModule({
            imports: [app_module_1.AppModule],
        }).compile();
        app = moduleRef.createNestApplication();
        app.useGlobalPipes(new common_1.ValidationPipe({
            transform: true,
            whitelist: true,
            forbidNonWhitelisted: true,
            skipMissingProperties: false,
            forbidUnknownValues: true,
        }));
        await app.init();
        await (0, fixtures_1.refresh)(app.get(typeorm_1.Connection));
    });
    afterAll(() => (0, fixtures_1.refresh)(app.get(typeorm_1.Connection)));
    beforeEach(async () => {
        const authService = app.get(auth_service_1.AuthService);
        jwtToken = (await authService.login({ username: 'nestjs-query', id: 1 })).accessToken;
    });
    const tags = [
        { id: '1', name: 'Urgent' },
        { id: '2', name: 'Home' },
        { id: '3', name: 'Work' },
        { id: '4', name: 'Question' },
        { id: '5', name: 'Blocked' },
    ];
    describe('find one', () => {
        it(`should require auth token`, () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .send({
            operationName: null,
            variables: {},
            query: `{
          tag(id: 1) {
            ${graphql_fragments_1.tagFields}
          }
        }`,
        })
            .expect(200)
            .then(({ body }) => expect(body.errors[0].message).toBe('Unauthorized')));
        it(`should find a tag by id`, () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .auth(jwtToken, { type: 'bearer' })
            .send({
            operationName: null,
            variables: {},
            query: `{
          tag(id: 1) {
            ${graphql_fragments_1.tagFields}
          }
        }`,
        })
            .expect(200, { data: { tag: tags[0] } }));
        it(`should return null if the tag is not found`, () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .auth(jwtToken, { type: 'bearer' })
            .send({
            operationName: null,
            variables: {},
            query: `{
          tag(id: 100) {
            ${graphql_fragments_1.tagFields}
          }
        }`,
        })
            .expect(200, {
            data: {
                tag: null,
            },
        }));
        it(`should return todoItems as a connection`, () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .auth(jwtToken, { type: 'bearer' })
            .send({
            operationName: null,
            variables: {},
            query: `{
          tag(id: 1) {
            todoItems(sorting: [{ field: id, direction: ASC }]) {
              ${graphql_fragments_1.pageInfoField}
              ${(0, graphql_fragments_1.edgeNodes)('id')}
              totalCount
            }
          }
        }`,
        })
            .expect(200)
            .then(({ body }) => {
            const { edges, pageInfo, totalCount } = body.data.tag.todoItems;
            expect(pageInfo).toEqual({
                endCursor: 'YXJyYXljb25uZWN0aW9uOjE=',
                hasNextPage: false,
                hasPreviousPage: false,
                startCursor: 'YXJyYXljb25uZWN0aW9uOjA=',
            });
            expect(totalCount).toBe(2);
            expect(edges).toHaveLength(2);
            expect(edges.map((e) => e.node.id)).toEqual(['1', '2']);
        }));
        it(`should return todoItems aggregate`, () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .auth(jwtToken, { type: 'bearer' })
            .send({
            operationName: null,
            variables: {},
            query: `{
          tag(id: 1) {
            todoItemsAggregate {
              ${graphql_fragments_1.todoItemAggregateFields}
            }
          }
        }`,
        })
            .expect(200)
            .then(({ body }) => {
            const agg = body.data.tag.todoItemsAggregate;
            expect(agg).toEqual([
                {
                    avg: { id: 1.5 },
                    count: { completed: 2, created: 2, description: 0, id: 2, title: 2, updated: 2 },
                    max: { description: null, id: '2', title: 'Create Nest App' },
                    min: { description: null, id: '1', title: 'Create Entity' },
                    sum: { id: 3 },
                },
            ]);
        }));
    });
    describe('query', () => {
        it(`should require an auth token`, () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .send({
            operationName: null,
            variables: {},
            query: `{
          tags {
            ${graphql_fragments_1.pageInfoField}
            ${(0, graphql_fragments_1.edgeNodes)(graphql_fragments_1.tagFields)}
            totalCount
          }
        }`,
        })
            .expect(200)
            .then(({ body }) => expect(body.errors[0].message).toBe('Unauthorized')));
        it(`should return a connection`, () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .auth(jwtToken, { type: 'bearer' })
            .send({
            operationName: null,
            variables: {},
            query: `{
          tags {
            ${graphql_fragments_1.pageInfoField}
            ${(0, graphql_fragments_1.edgeNodes)(graphql_fragments_1.tagFields)}
            totalCount
          }
        }`,
        })
            .expect(200)
            .then(({ body }) => {
            const { edges, pageInfo, totalCount } = body.data.tags;
            expect(pageInfo).toEqual({
                endCursor: 'YXJyYXljb25uZWN0aW9uOjQ=',
                hasNextPage: false,
                hasPreviousPage: false,
                startCursor: 'YXJyYXljb25uZWN0aW9uOjA=',
            });
            expect(totalCount).toBe(5);
            expect(edges).toHaveLength(5);
            expect(edges.map((e) => e.node)).toEqual(tags);
        }));
        it(`should allow querying`, () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .auth(jwtToken, { type: 'bearer' })
            .send({
            operationName: null,
            variables: {},
            query: `{
          tags(filter: { id: { in: [1, 2, 3] } }) {
            ${graphql_fragments_1.pageInfoField}
            ${(0, graphql_fragments_1.edgeNodes)(graphql_fragments_1.tagFields)}
            totalCount
          }
        }`,
        })
            .expect(200)
            .then(({ body }) => {
            const { edges, pageInfo, totalCount } = body.data.tags;
            expect(pageInfo).toEqual({
                endCursor: 'YXJyYXljb25uZWN0aW9uOjI=',
                hasNextPage: false,
                hasPreviousPage: false,
                startCursor: 'YXJyYXljb25uZWN0aW9uOjA=',
            });
            expect(totalCount).toBe(3);
            expect(edges).toHaveLength(3);
            expect(edges.map((e) => e.node)).toEqual(tags.slice(0, 3));
        }));
        it(`should allow querying on todoItems`, () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .auth(jwtToken, { type: 'bearer' })
            .send({
            operationName: null,
            variables: {},
            query: `{
          tags(filter: { todoItems: { title: { like: "Create Entity%" } } }, sorting: [{field: id, direction: ASC}]) {
            ${graphql_fragments_1.pageInfoField}
            ${(0, graphql_fragments_1.edgeNodes)(graphql_fragments_1.tagFields)}
            totalCount
          }
        }`,
        })
            .expect(200)
            .then(({ body }) => {
            const { edges, pageInfo, totalCount } = body.data.tags;
            expect(pageInfo).toEqual({
                endCursor: 'YXJyYXljb25uZWN0aW9uOjI=',
                hasNextPage: false,
                hasPreviousPage: false,
                startCursor: 'YXJyYXljb25uZWN0aW9uOjA=',
            });
            expect(totalCount).toBe(3);
            expect(edges).toHaveLength(3);
            expect(edges.map((e) => e.node)).toEqual([tags[0], tags[2], tags[4]]);
        }));
        it(`should allow sorting`, () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .auth(jwtToken, { type: 'bearer' })
            .send({
            operationName: null,
            variables: {},
            query: `{
          tags(sorting: [{field: id, direction: DESC}]) {
            ${graphql_fragments_1.pageInfoField}
            ${(0, graphql_fragments_1.edgeNodes)(graphql_fragments_1.tagFields)}
            totalCount
          }
        }`,
        })
            .expect(200)
            .then(({ body }) => {
            const { edges, pageInfo, totalCount } = body.data.tags;
            expect(pageInfo).toEqual({
                endCursor: 'YXJyYXljb25uZWN0aW9uOjQ=',
                hasNextPage: false,
                hasPreviousPage: false,
                startCursor: 'YXJyYXljb25uZWN0aW9uOjA=',
            });
            expect(totalCount).toBe(5);
            expect(edges).toHaveLength(5);
            expect(edges.map((e) => e.node)).toEqual(tags.slice().reverse());
        }));
        describe('paging', () => {
            it(`should allow paging with the 'first' field`, () => (0, supertest_1.default)(app.getHttpServer())
                .post('/graphql')
                .auth(jwtToken, { type: 'bearer' })
                .send({
                operationName: null,
                variables: {},
                query: `{
          tags(paging: {first: 2}) {
            ${graphql_fragments_1.pageInfoField}
            ${(0, graphql_fragments_1.edgeNodes)(graphql_fragments_1.tagFields)}
            totalCount
          }
        }`,
            })
                .expect(200)
                .then(({ body }) => {
                const { edges, pageInfo, totalCount } = body.data.tags;
                expect(pageInfo).toEqual({
                    endCursor: 'YXJyYXljb25uZWN0aW9uOjE=',
                    hasNextPage: true,
                    hasPreviousPage: false,
                    startCursor: 'YXJyYXljb25uZWN0aW9uOjA=',
                });
                expect(totalCount).toBe(5);
                expect(edges).toHaveLength(2);
                expect(edges.map((e) => e.node)).toEqual(tags.slice(0, 2));
            }));
            it(`should allow paging with the 'first' field and 'after'`, () => (0, supertest_1.default)(app.getHttpServer())
                .post('/graphql')
                .auth(jwtToken, { type: 'bearer' })
                .send({
                operationName: null,
                variables: {},
                query: `{
          tags(paging: {first: 2, after: "YXJyYXljb25uZWN0aW9uOjE="}) {
            ${graphql_fragments_1.pageInfoField}
            ${(0, graphql_fragments_1.edgeNodes)(graphql_fragments_1.tagFields)}
            totalCount
          }
        }`,
            })
                .expect(200)
                .then(({ body }) => {
                const { edges, pageInfo, totalCount } = body.data.tags;
                expect(pageInfo).toEqual({
                    endCursor: 'YXJyYXljb25uZWN0aW9uOjM=',
                    hasNextPage: true,
                    hasPreviousPage: true,
                    startCursor: 'YXJyYXljb25uZWN0aW9uOjI=',
                });
                expect(totalCount).toBe(5);
                expect(edges).toHaveLength(2);
                expect(edges.map((e) => e.node)).toEqual(tags.slice(2, 4));
            }));
        });
    });
    describe('aggregate', () => {
        it(`should require an auth token`, () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .send({
            operationName: null,
            variables: {},
            query: `{ 
          tagAggregate {
              ${graphql_fragments_1.tagAggregateFields}
            }
        }`,
        })
            .expect(200)
            .then(({ body }) => expect(body.errors[0].message).toBe('Unauthorized')));
        it(`should return a aggregate response`, () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .auth(jwtToken, { type: 'bearer' })
            .send({
            operationName: null,
            variables: {},
            query: `{ 
          tagAggregate {
              ${graphql_fragments_1.tagAggregateFields}
            }
        }`,
        })
            .expect(200)
            .then(({ body }) => {
            const res = body.data.tagAggregate;
            expect(res).toEqual([
                {
                    count: { id: 5, name: 5, created: 5, updated: 5 },
                    sum: { id: 15 },
                    avg: { id: 3 },
                    min: { id: '1', name: 'Blocked' },
                    max: { id: '5', name: 'Work' },
                },
            ]);
        }));
        it(`should allow filtering`, () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .auth(jwtToken, { type: 'bearer' })
            .send({
            operationName: null,
            variables: {},
            query: `{ 
          tagAggregate(filter: { name: { in: ["Urgent", "Blocked", "Work"] } }) {
              ${graphql_fragments_1.tagAggregateFields}
            }
        }`,
        })
            .expect(200)
            .then(({ body }) => {
            const res = body.data.tagAggregate;
            expect(res).toEqual([
                {
                    count: { id: 3, name: 3, created: 3, updated: 3 },
                    sum: { id: 9 },
                    avg: { id: 3 },
                    min: { id: '1', name: 'Blocked' },
                    max: { id: '5', name: 'Work' },
                },
            ]);
        }));
    });
    describe('create one', () => {
        it('should require an auth token', () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .send({
            operationName: null,
            variables: {},
            query: `mutation {
            createOneTag(
              input: {
                tag: { name: "Test Tag" }
              }
            ) {
              ${graphql_fragments_1.tagFields}
            }
        }`,
        })
            .expect(200)
            .then(({ body }) => expect(body.errors[0].message).toBe('Unauthorized')));
        it('should allow creating a tag', () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .auth(jwtToken, { type: 'bearer' })
            .send({
            operationName: null,
            variables: {},
            query: `mutation {
            createOneTag(
              input: {
                tag: { name: "Test Tag" }
              }
            ) {
              ${graphql_fragments_1.tagFields}
            }
        }`,
        })
            .expect(200, {
            data: {
                createOneTag: {
                    id: '6',
                    name: 'Test Tag',
                },
            },
        }));
        it('should call beforeCreateOne hook when creating a tag', () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .auth(jwtToken, { type: 'bearer' })
            .send({
            operationName: null,
            variables: {},
            query: `mutation {
            createOneTag(
              input: {
                tag: { name: "Before Create One Tag" }
              }
            ) {
              ${graphql_fragments_1.tagFields}
              createdBy
            }
        }`,
        })
            .expect(200, {
            data: {
                createOneTag: {
                    id: '7',
                    name: 'Before Create One Tag',
                    createdBy: 'nestjs-query',
                },
            },
        }));
        it('should validate a tag', () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .auth(jwtToken, { type: 'bearer' })
            .send({
            operationName: null,
            variables: {},
            query: `mutation {
            createOneTag(
              input: {
                tag: { name: "" }
              }
            ) {
              ${graphql_fragments_1.tagFields}
            }
        }`,
        })
            .expect(200)
            .then(({ body }) => {
            expect(body.errors).toHaveLength(1);
            expect(JSON.stringify(body.errors[0])).toContain('name should not be empty');
        }));
    });
    describe('create many', () => {
        it('should require an auth token', () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .send({
            operationName: null,
            variables: {},
            query: `mutation {
            createManyTags(
              input: {
                tags: [
                  { name: "Create Many Tag - 1" },
                  { name: "Create Many Tag - 2" }
                ]
              }
            ) {
              ${graphql_fragments_1.tagFields}
            }
        }`,
        })
            .expect(200)
            .then(({ body }) => expect(body.errors[0].message).toBe('Unauthorized')));
        it('should allow creating a tag', () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .auth(jwtToken, { type: 'bearer' })
            .send({
            operationName: null,
            variables: {},
            query: `mutation {
            createManyTags(
              input: {
                tags: [
                  { name: "Create Many Tag - 1" },
                  { name: "Create Many Tag - 2" }
                ]
              }
            ) {
              ${graphql_fragments_1.tagFields}
            }
        }`,
        })
            .expect(200, {
            data: {
                createManyTags: [
                    { id: '8', name: 'Create Many Tag - 1' },
                    { id: '9', name: 'Create Many Tag - 2' },
                ],
            },
        }));
        it('should call beforeCreateMany hook when creating multiple tags', () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .auth(jwtToken, { type: 'bearer' })
            .send({
            operationName: null,
            variables: {},
            query: `mutation {
            createManyTags(
              input: {
                tags: [
                  { name: "Before Create Many Tag - 1" },
                  { name: "Before Create Many Tag - 2" }
                ]
              }
            ) {
              ${graphql_fragments_1.tagFields}
              createdBy
            }
        }`,
        })
            .expect(200, {
            data: {
                createManyTags: [
                    { id: '10', name: 'Before Create Many Tag - 1', createdBy: 'nestjs-query' },
                    { id: '11', name: 'Before Create Many Tag - 2', createdBy: 'nestjs-query' },
                ],
            },
        }));
        it('should validate a tag', () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .auth(jwtToken, { type: 'bearer' })
            .send({
            operationName: null,
            variables: {},
            query: `mutation {
            createManyTags(
              input: {
                tags: [{ name: "" }]
              }
            ) {
              ${graphql_fragments_1.tagFields}
            }
        }`,
        })
            .expect(200)
            .then(({ body }) => {
            expect(body.errors).toHaveLength(1);
            expect(JSON.stringify(body.errors[0])).toContain('name should not be empty');
        }));
    });
    describe('update one', () => {
        it('should require an auth token', () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .send({
            operationName: null,
            variables: {},
            query: `mutation {
            updateOneTag(
              input: {
                id: "6",
                update: { name: "Update Test Tag" }
              }
            ) {
              ${graphql_fragments_1.tagFields}
            }
        }`,
        })
            .expect(200)
            .then(({ body }) => expect(body.errors[0].message).toBe('Unauthorized')));
        it('should allow updating a tag', () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .auth(jwtToken, { type: 'bearer' })
            .send({
            operationName: null,
            variables: {},
            query: `mutation {
            updateOneTag(
              input: {
                id: "6",
                update: { name: "Update Test Tag" }
              }
            ) {
              ${graphql_fragments_1.tagFields}
            }
        }`,
        })
            .expect(200, {
            data: {
                updateOneTag: {
                    id: '6',
                    name: 'Update Test Tag',
                },
            },
        }));
        it('should call beforeUpdateOne hook when updating a tag', () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .auth(jwtToken, { type: 'bearer' })
            .send({
            operationName: null,
            variables: {},
            query: `mutation {
            updateOneTag(
              input: {
                id: "7",
                update: { name: "Before Update One Test Tag" }
              }
            ) {
              ${graphql_fragments_1.tagFields}
              updatedBy
            }
        }`,
        })
            .expect(200, {
            data: {
                updateOneTag: {
                    id: '7',
                    name: 'Before Update One Test Tag',
                    updatedBy: 'nestjs-query',
                },
            },
        }));
        it('should require an id', () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .auth(jwtToken, { type: 'bearer' })
            .send({
            operationName: null,
            variables: {},
            query: `mutation {
            updateOneTag(
              input: {
                update: { name: "Update Test Tag" }
              }
            ) {
              ${graphql_fragments_1.tagFields}
            }
        }`,
        })
            .expect(400)
            .then(({ body }) => {
            expect(body.errors).toHaveLength(1);
            expect(body.errors[0].message).toBe('Field "UpdateOneTagInput.id" of required type "ID!" was not provided.');
        }));
        it('should validate an update', () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .auth(jwtToken, { type: 'bearer' })
            .send({
            operationName: null,
            variables: {},
            query: `mutation {
            updateOneTag(
              input: {
                id: "6",
                update: { name: "" }
              }
            ) {
              ${graphql_fragments_1.tagFields}
            }
        }`,
        })
            .expect(200)
            .then(({ body }) => {
            expect(body.errors).toHaveLength(1);
            expect(JSON.stringify(body.errors[0])).toContain('name should not be empty');
        }));
    });
    describe('update many', () => {
        it('should require an auth token', () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .send({
            operationName: null,
            variables: {},
            query: `mutation {
            updateManyTags(
              input: {
                filter: {id: { in: ["8", "9"]} },
                update: { name: "Update Many Tag" }
              }
            ) {
              updatedCount
            }
        }`,
        })
            .expect(200)
            .then(({ body }) => expect(body.errors[0].message).toBe('Unauthorized')));
        it('should allow updating a tag', () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .auth(jwtToken, { type: 'bearer' })
            .send({
            operationName: null,
            variables: {},
            query: `mutation {
            updateManyTags(
              input: {
                filter: {id: { in: ["8", "9"]} },
                update: { name: "Update Many Tag" }
              }
            ) {
              updatedCount
            }
        }`,
        })
            .expect(200, {
            data: {
                updateManyTags: {
                    updatedCount: 2,
                },
            },
        }));
        it('should call beforeUpdateMany hook when updating multiple tags', () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .auth(jwtToken, { type: 'bearer' })
            .send({
            operationName: null,
            variables: {},
            query: `mutation {
            updateManyTags(
              input: {
                filter: {id: { in: ["10", "11"]} },
                update: { name: "Before Update Many Tag" }
              }
            ) {
              updatedCount
            }
        }`,
        })
            .expect(200, {
            data: {
                updateManyTags: {
                    updatedCount: 2,
                },
            },
        })
            .then(async () => {
            const queryService = app.get((0, core_1.getQueryServiceToken)(tag_entity_1.TagEntity));
            const todoItems = await queryService.query({ filter: { id: { in: [10, 11] } } });
            expect(todoItems.map((ti) => ({
                id: ti.id,
                name: ti.name,
                updatedBy: ti.updatedBy,
            }))).toEqual([
                { id: 10, name: 'Before Update Many Tag', updatedBy: 'nestjs-query' },
                { id: 11, name: 'Before Update Many Tag', updatedBy: 'nestjs-query' },
            ]);
        }));
        it('should require a filter', () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .auth(jwtToken, { type: 'bearer' })
            .send({
            operationName: null,
            variables: {},
            query: `mutation {
            updateManyTags(
              input: {
                update: { name: "Update Many Tag" }
              }
            ) {
              updatedCount
            }
        }`,
        })
            .expect(400)
            .then(({ body }) => {
            expect(body.errors).toHaveLength(1);
            expect(body.errors[0].message).toBe('Field "UpdateManyTagsInput.filter" of required type "TagUpdateFilter!" was not provided.');
        }));
        it('should require a non-empty filter', () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .auth(jwtToken, { type: 'bearer' })
            .send({
            operationName: null,
            variables: {},
            query: `mutation {
            updateManyTags(
              input: {
                filter: { },
                update: { name: "Update Many Tag" }
              }
            ) {
              updatedCount
            }
        }`,
        })
            .expect(200)
            .then(({ body }) => {
            expect(body.errors).toHaveLength(1);
            expect(JSON.stringify(body.errors[0])).toContain('filter must be a non-empty object');
        }));
    });
    describe('delete one', () => {
        it('should require an auth token', () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .send({
            operationName: null,
            variables: {},
            query: `mutation {
            deleteOneTag(
              input: { id: "6" }
            ) {
              ${graphql_fragments_1.tagFields}
            }
        }`,
        })
            .expect(200)
            .then(({ body }) => expect(body.errors[0].message).toBe('Unauthorized')));
        it('should allow deleting a tag', () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .auth(jwtToken, { type: 'bearer' })
            .send({
            operationName: null,
            variables: {},
            query: `mutation {
            deleteOneTag(
              input: { id: "6" }
            ) {
              ${graphql_fragments_1.tagFields}
            }
        }`,
        })
            .expect(200, {
            data: {
                deleteOneTag: {
                    id: null,
                    name: 'Update Test Tag',
                },
            },
        }));
        it('should require an id', () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .auth(jwtToken, { type: 'bearer' })
            .send({
            operationName: null,
            variables: {},
            query: `mutation {
            deleteOneTag(
              input: { }
            ) {
              ${graphql_fragments_1.tagFields}
            }
        }`,
        })
            .expect(400)
            .then(({ body }) => {
            expect(body.errors).toHaveLength(1);
            expect(body.errors[0].message).toBe('Field "DeleteOneTagInput.id" of required type "ID!" was not provided.');
        }));
    });
    describe('delete many', () => {
        it('should require an auth token', () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .send({
            operationName: null,
            variables: {},
            query: `mutation {
            deleteManyTags(
              input: {
                filter: {id: { in: ["17", "18"]} },
              }
            ) {
              deletedCount
            }
        }`,
        })
            .expect(200)
            .then(({ body }) => expect(body.errors[0].message).toBe('Unauthorized')));
        it('should allow updating a tag', () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .auth(jwtToken, { type: 'bearer' })
            .send({
            operationName: null,
            variables: {},
            query: `mutation {
            deleteManyTags(
              input: {
                filter: {id: { in: ["7", "8"]} },
              }
            ) {
              deletedCount
            }
        }`,
        })
            .expect(200, {
            data: {
                deleteManyTags: {
                    deletedCount: 2,
                },
            },
        }));
        it('should require a filter', () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .auth(jwtToken, { type: 'bearer' })
            .send({
            operationName: null,
            variables: {},
            query: `mutation {
            deleteManyTags(
              input: { }
            ) {
              deletedCount
            }
        }`,
        })
            .expect(400)
            .then(({ body }) => {
            expect(body.errors).toHaveLength(1);
            expect(body.errors[0].message).toBe('Field "DeleteManyTagsInput.filter" of required type "TagDeleteFilter!" was not provided.');
        }));
        it('should require a non-empty filter', () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .auth(jwtToken, { type: 'bearer' })
            .send({
            operationName: null,
            variables: {},
            query: `mutation {
            deleteManyTags(
              input: {
                filter: { },
              }
            ) {
              deletedCount
            }
        }`,
        })
            .expect(200)
            .then(({ body }) => {
            expect(body.errors).toHaveLength(1);
            expect(JSON.stringify(body.errors[0])).toContain('filter must be a non-empty object');
        }));
    });
    describe('addTodoItemsToTag', () => {
        it('should require an auth token', () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .send({
            operationName: null,
            variables: {},
            query: `mutation {
            addTodoItemsToTag(
              input: {
                id: 1,
                relationIds: ["3", "4", "5"]
              }
            ) {
              ${graphql_fragments_1.tagFields}
              todoItems {
                ${graphql_fragments_1.pageInfoField}
                ${(0, graphql_fragments_1.edgeNodes)(graphql_fragments_1.todoItemFields)}
                totalCount
              }
            }
        }`,
        })
            .expect(200)
            .then(({ body }) => expect(body.errors[0].message).toBe('Unauthorized')));
        it('allow adding subTasks to a tag', () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .auth(jwtToken, { type: 'bearer' })
            .send({
            operationName: null,
            variables: {},
            query: `mutation {
            addTodoItemsToTag(
              input: {
                id: 1,
                relationIds: ["3", "4", "5"]
              }
            ) {
              ${graphql_fragments_1.tagFields}
              todoItems {
                ${graphql_fragments_1.pageInfoField}
                ${(0, graphql_fragments_1.edgeNodes)(graphql_fragments_1.todoItemFields)}
                totalCount
              }
            }
        }`,
        })
            .expect(200)
            .then(({ body }) => {
            const { edges, pageInfo, totalCount } = body.data.addTodoItemsToTag.todoItems;
            expect(body.data.addTodoItemsToTag.id).toBe('1');
            expect(pageInfo).toEqual({
                endCursor: 'YXJyYXljb25uZWN0aW9uOjQ=',
                hasNextPage: false,
                hasPreviousPage: false,
                startCursor: 'YXJyYXljb25uZWN0aW9uOjA=',
            });
            expect(totalCount).toBe(5);
            expect(edges).toHaveLength(5);
            expect(edges.map((e) => e.node.title).sort()).toEqual([
                'Add Todo Item Resolver',
                'Create Entity',
                'Create Entity Service',
                'Create Nest App',
                'How to create item With Sub Tasks',
            ]);
        }));
    });
    describe('removeTodoItemsFromTag', () => {
        it('should require an auth token', () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .send({
            operationName: null,
            variables: {},
            query: `mutation {
            removeTodoItemsFromTag(
              input: {
                id: 1,
                relationIds: ["3", "4", "5"]
              }
            ) {
              ${graphql_fragments_1.tagFields}
              todoItems {
                ${graphql_fragments_1.pageInfoField}
                ${(0, graphql_fragments_1.edgeNodes)(graphql_fragments_1.todoItemFields)}
                totalCount
              }
            }
        }`,
        })
            .expect(200)
            .then(({ body }) => expect(body.errors[0].message).toBe('Unauthorized')));
        it('allow removing todoItems from a tag', () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .auth(jwtToken, { type: 'bearer' })
            .send({
            operationName: null,
            variables: {},
            query: `mutation {
            removeTodoItemsFromTag(
              input: {
                id: 1,
                relationIds: ["3", "4", "5"]
              }
            ) {
              ${graphql_fragments_1.tagFields}
              todoItems {
                ${graphql_fragments_1.pageInfoField}
                ${(0, graphql_fragments_1.edgeNodes)(graphql_fragments_1.todoItemFields)}
                totalCount
              }
            }
        }`,
        })
            .expect(200)
            .then(({ body }) => {
            const { edges, pageInfo, totalCount } = body.data.removeTodoItemsFromTag.todoItems;
            expect(body.data.removeTodoItemsFromTag.id).toBe('1');
            expect(pageInfo).toEqual({
                endCursor: 'YXJyYXljb25uZWN0aW9uOjE=',
                hasNextPage: false,
                hasPreviousPage: false,
                startCursor: 'YXJyYXljb25uZWN0aW9uOjA=',
            });
            expect(totalCount).toBe(2);
            expect(edges).toHaveLength(2);
            expect(edges.map((e) => e.node.title).sort()).toEqual(['Create Entity', 'Create Nest App']);
        }));
    });
    afterAll(async () => {
        await app.close();
    });
});
//# sourceMappingURL=tag.resolver.spec.js.map