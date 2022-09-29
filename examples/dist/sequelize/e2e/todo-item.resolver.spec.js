"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const testing_1 = require("@nestjs/testing");
const supertest_1 = (0, tslib_1.__importDefault)(require("supertest"));
const common_1 = require("@nestjs/common");
const sequelize_typescript_1 = require("sequelize-typescript");
const graphql_fragments_1 = require("./graphql-fragments");
const app_module_1 = require("../src/app.module");
const config_1 = require("../src/config");
const constants_1 = require("../src/constants");
const fixtures_1 = require("./fixtures");
describe('TodoItemResolver (sequelize - e2e)', () => {
    let app;
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
        await (0, fixtures_1.refresh)(app.get(sequelize_typescript_1.Sequelize));
    });
    afterAll(() => (0, fixtures_1.refresh)(app.get(sequelize_typescript_1.Sequelize)));
    describe('find one', () => {
        it(`should find a todo item by id`, () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .send({
            operationName: null,
            variables: {},
            query: `{
          todoItem(id: 1) {
            ${graphql_fragments_1.todoItemFields}
          }
        }`,
        })
            .expect(200)
            .then(({ body }) => {
            expect(body).toEqual({
                data: {
                    todoItem: {
                        id: '1',
                        title: 'Create Nest App',
                        completed: true,
                        description: null,
                        age: expect.any(Number),
                    },
                },
            });
        }));
        it(`should return null if the todo item is not found`, () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .send({
            operationName: null,
            variables: {},
            query: `{
          todoItem(id: 100) {
            ${graphql_fragments_1.todoItemFields}
          }
        }`,
        })
            .expect(200, {
            data: {
                todoItem: null,
            },
        }));
        it(`should return subTasks as a connection`, () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .send({
            operationName: null,
            variables: {},
            query: `{
          todoItem(id: 1) {
            subTasks(sorting: { field: id, direction: ASC }) {
              ${graphql_fragments_1.pageInfoField}
              ${(0, graphql_fragments_1.edgeNodes)(graphql_fragments_1.subTaskFields)}
              totalCount
            }
          }
        }`,
        })
            .expect(200)
            .then(({ body }) => {
            const { edges, pageInfo, totalCount } = body.data.todoItem.subTasks;
            expect(pageInfo).toEqual({
                endCursor: 'YXJyYXljb25uZWN0aW9uOjI=',
                hasNextPage: false,
                hasPreviousPage: false,
                startCursor: 'YXJyYXljb25uZWN0aW9uOjA=',
            });
            expect(totalCount).toBe(3);
            expect(edges).toHaveLength(3);
            edges.forEach((e) => expect(e.node.todoItemId).toBe(1));
        }));
        it(`should return subTasksAggregate`, () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .send({
            operationName: null,
            variables: {},
            query: `{
          todoItem(id: 1) {
            subTasksAggregate {
              ${graphql_fragments_1.subTaskAggregateFields}
            }
          }
        }`,
        })
            .expect(200)
            .then(({ body }) => {
            const agg = body.data.todoItem.subTasksAggregate;
            expect(agg).toEqual([
                {
                    avg: { id: 2 },
                    count: { completed: 3, description: 0, id: 3, title: 3, todoItemId: 3 },
                    max: { description: null, id: '3', title: 'Create Nest App - Sub Task 3', todoItemId: 1 },
                    min: { description: null, id: '1', title: 'Create Nest App - Sub Task 1', todoItemId: 1 },
                    sum: { id: 6 },
                },
            ]);
        }));
        it(`should return tags as a connection`, () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .send({
            operationName: null,
            variables: {},
            query: `{
          todoItem(id: 1) {
            tags(sorting: [{ field: id, direction: ASC }]) {
              ${graphql_fragments_1.pageInfoField}
              ${(0, graphql_fragments_1.edgeNodes)(graphql_fragments_1.tagFields)}
              totalCount
            }
          }
        }`,
        })
            .expect(200)
            .then(({ body }) => {
            const { edges, pageInfo, totalCount } = body.data.todoItem.tags;
            expect(pageInfo).toEqual({
                endCursor: 'YXJyYXljb25uZWN0aW9uOjE=',
                hasNextPage: false,
                hasPreviousPage: false,
                startCursor: 'YXJyYXljb25uZWN0aW9uOjA=',
            });
            expect(totalCount).toBe(2);
            expect(edges).toHaveLength(2);
            expect(edges.map((e) => e.node.name)).toEqual(['Urgent', 'Home']);
        }));
        it(`should return tagsAggregate`, () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .send({
            operationName: null,
            variables: {},
            query: `{
          todoItem(id: 1) {
            tagsAggregate {
              ${graphql_fragments_1.tagAggregateFields}
            }
          }
        }`,
        })
            .expect(200)
            .then(({ body }) => {
            const agg = body.data.todoItem.tagsAggregate;
            expect(agg).toEqual([
                {
                    avg: { id: 1.5 },
                    count: { created: 2, id: 2, name: 2, updated: 2 },
                    max: { id: '2', name: 'Urgent' },
                    min: { id: '1', name: 'Home' },
                    sum: { id: 3 },
                },
            ]);
        }));
    });
    describe('query', () => {
        it(`should return a connection`, () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .send({
            operationName: null,
            variables: {},
            query: `{
          todoItems {
            ${graphql_fragments_1.pageInfoField}
            ${(0, graphql_fragments_1.edgeNodes)(graphql_fragments_1.todoItemFields)}
            totalCount
          }
        }`,
        })
            .expect(200)
            .then(({ body }) => {
            const { edges, pageInfo, totalCount } = body.data.todoItems;
            expect(pageInfo).toEqual({
                endCursor: 'eyJ0eXBlIjoia2V5c2V0IiwiZmllbGRzIjpbeyJmaWVsZCI6ImlkIiwidmFsdWUiOjV9XX0=',
                hasNextPage: false,
                hasPreviousPage: false,
                startCursor: 'eyJ0eXBlIjoia2V5c2V0IiwiZmllbGRzIjpbeyJmaWVsZCI6ImlkIiwidmFsdWUiOjF9XX0=',
            });
            expect(totalCount).toBe(5);
            expect(edges).toHaveLength(5);
            expect(edges.map((e) => e.node)).toEqual([
                { id: '1', title: 'Create Nest App', completed: true, description: null, age: expect.any(Number) },
                { id: '2', title: 'Create Entity', completed: false, description: null, age: expect.any(Number) },
                { id: '3', title: 'Create Entity Service', completed: false, description: null, age: expect.any(Number) },
                { id: '4', title: 'Add Todo Item Resolver', completed: false, description: null, age: expect.any(Number) },
                {
                    id: '5',
                    title: 'How to create item With Sub Tasks',
                    completed: false,
                    description: null,
                    age: expect.any(Number),
                },
            ]);
        }));
        it(`should allow querying`, () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .send({
            operationName: null,
            variables: {},
            query: `{
          todoItems(filter: { id: { in: [1, 2, 3] } }) {
            ${graphql_fragments_1.pageInfoField}
            ${(0, graphql_fragments_1.edgeNodes)(graphql_fragments_1.todoItemFields)}
            totalCount
          }
        }`,
        })
            .expect(200)
            .then(({ body }) => {
            const { edges, pageInfo, totalCount } = body.data.todoItems;
            expect(pageInfo).toEqual({
                endCursor: 'eyJ0eXBlIjoia2V5c2V0IiwiZmllbGRzIjpbeyJmaWVsZCI6ImlkIiwidmFsdWUiOjN9XX0=',
                hasNextPage: false,
                hasPreviousPage: false,
                startCursor: 'eyJ0eXBlIjoia2V5c2V0IiwiZmllbGRzIjpbeyJmaWVsZCI6ImlkIiwidmFsdWUiOjF9XX0=',
            });
            expect(totalCount).toBe(3);
            expect(edges).toHaveLength(3);
            expect(edges.map((e) => e.node)).toEqual([
                { id: '1', title: 'Create Nest App', completed: true, description: null, age: expect.any(Number) },
                { id: '2', title: 'Create Entity', completed: false, description: null, age: expect.any(Number) },
                { id: '3', title: 'Create Entity Service', completed: false, description: null, age: expect.any(Number) },
            ]);
        }));
        it(`should allow querying on subTasks`, () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .send({
            operationName: null,
            variables: {},
            query: `{
          todoItems(filter: { subTasks: { title: { in: ["Create Nest App - Sub Task 1", "Create Entity - Sub Task 1"] } } }) {
            ${graphql_fragments_1.pageInfoField}
            ${(0, graphql_fragments_1.edgeNodes)(graphql_fragments_1.todoItemFields)}
            totalCount
          }
        }`,
        })
            .expect(200)
            .then(({ body }) => {
            const { edges, totalCount, pageInfo } = body.data.todoItems;
            expect(pageInfo).toEqual({
                endCursor: 'eyJ0eXBlIjoia2V5c2V0IiwiZmllbGRzIjpbeyJmaWVsZCI6ImlkIiwidmFsdWUiOjJ9XX0=',
                hasNextPage: false,
                hasPreviousPage: false,
                startCursor: 'eyJ0eXBlIjoia2V5c2V0IiwiZmllbGRzIjpbeyJmaWVsZCI6ImlkIiwidmFsdWUiOjF9XX0=',
            });
            expect(totalCount).toBe(2);
            expect(edges).toHaveLength(2);
            expect(edges.map((e) => e.node)).toEqual([
                { id: '1', title: 'Create Nest App', completed: true, description: null, age: expect.any(Number) },
                { id: '2', title: 'Create Entity', completed: false, description: null, age: expect.any(Number) },
            ]);
        }));
        it(`should allow querying on tags`, () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .send({
            operationName: null,
            variables: {},
            query: `{
          todoItems(filter: { tags: { name: { eq: "Home" } } }) {
            ${graphql_fragments_1.pageInfoField}
            ${(0, graphql_fragments_1.edgeNodes)(graphql_fragments_1.todoItemFields)}
            totalCount
          }
        }`,
        })
            .expect(200)
            .then(({ body }) => {
            const { edges, totalCount, pageInfo } = body.data.todoItems;
            expect(pageInfo).toEqual({
                endCursor: 'eyJ0eXBlIjoia2V5c2V0IiwiZmllbGRzIjpbeyJmaWVsZCI6ImlkIiwidmFsdWUiOjR9XX0=',
                hasNextPage: false,
                hasPreviousPage: false,
                startCursor: 'eyJ0eXBlIjoia2V5c2V0IiwiZmllbGRzIjpbeyJmaWVsZCI6ImlkIiwidmFsdWUiOjF9XX0=',
            });
            expect(totalCount).toBe(2);
            expect(edges).toHaveLength(2);
            expect(edges.map((e) => e.node)).toEqual([
                { id: '1', title: 'Create Nest App', completed: true, description: null, age: expect.any(Number) },
                { id: '4', title: 'Add Todo Item Resolver', completed: false, description: null, age: expect.any(Number) },
            ]);
        }));
        it(`should allow sorting`, () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .send({
            operationName: null,
            variables: {},
            query: `{
          todoItems(sorting: [{field: id, direction: DESC}]) {
            ${graphql_fragments_1.pageInfoField}
            ${(0, graphql_fragments_1.edgeNodes)(graphql_fragments_1.todoItemFields)}
            totalCount
          }
        }`,
        })
            .expect(200)
            .then(({ body }) => {
            const { edges, pageInfo, totalCount } = body.data.todoItems;
            expect(pageInfo).toEqual({
                endCursor: 'eyJ0eXBlIjoia2V5c2V0IiwiZmllbGRzIjpbeyJmaWVsZCI6ImlkIiwidmFsdWUiOjF9XX0=',
                hasNextPage: false,
                hasPreviousPage: false,
                startCursor: 'eyJ0eXBlIjoia2V5c2V0IiwiZmllbGRzIjpbeyJmaWVsZCI6ImlkIiwidmFsdWUiOjV9XX0=',
            });
            expect(totalCount).toBe(5);
            expect(edges).toHaveLength(5);
            expect(edges.map((e) => e.node)).toEqual([
                {
                    id: '5',
                    title: 'How to create item With Sub Tasks',
                    completed: false,
                    description: null,
                    age: expect.any(Number),
                },
                { id: '4', title: 'Add Todo Item Resolver', completed: false, description: null, age: expect.any(Number) },
                { id: '3', title: 'Create Entity Service', completed: false, description: null, age: expect.any(Number) },
                { id: '2', title: 'Create Entity', completed: false, description: null, age: expect.any(Number) },
                { id: '1', title: 'Create Nest App', completed: true, description: null, age: expect.any(Number) },
            ]);
        }));
        describe('paging', () => {
            it(`should allow paging with the 'first' field`, () => (0, supertest_1.default)(app.getHttpServer())
                .post('/graphql')
                .send({
                operationName: null,
                variables: {},
                query: `{
          todoItems(paging: {first: 2}) {
            ${graphql_fragments_1.pageInfoField}
            ${(0, graphql_fragments_1.edgeNodes)(graphql_fragments_1.todoItemFields)}
            totalCount
          }
        }`,
            })
                .expect(200)
                .then(({ body }) => {
                const { edges, pageInfo, totalCount } = body.data.todoItems;
                expect(pageInfo).toEqual({
                    endCursor: 'eyJ0eXBlIjoia2V5c2V0IiwiZmllbGRzIjpbeyJmaWVsZCI6ImlkIiwidmFsdWUiOjJ9XX0=',
                    hasNextPage: true,
                    hasPreviousPage: false,
                    startCursor: 'eyJ0eXBlIjoia2V5c2V0IiwiZmllbGRzIjpbeyJmaWVsZCI6ImlkIiwidmFsdWUiOjF9XX0=',
                });
                expect(totalCount).toBe(5);
                expect(edges).toHaveLength(2);
                expect(edges.map((e) => e.node)).toEqual([
                    { id: '1', title: 'Create Nest App', completed: true, description: null, age: expect.any(Number) },
                    { id: '2', title: 'Create Entity', completed: false, description: null, age: expect.any(Number) },
                ]);
            }));
            it(`should allow paging with the 'first' field and 'after'`, () => (0, supertest_1.default)(app.getHttpServer())
                .post('/graphql')
                .send({
                operationName: null,
                variables: {},
                query: `{
          todoItems(paging: {first: 2, after: "eyJ0eXBlIjoia2V5c2V0IiwiZmllbGRzIjpbeyJmaWVsZCI6ImlkIiwidmFsdWUiOjJ9XX0="}) {
            ${graphql_fragments_1.pageInfoField}
            ${(0, graphql_fragments_1.edgeNodes)(graphql_fragments_1.todoItemFields)}
            totalCount
          }
        }`,
            })
                .expect(200)
                .then(({ body }) => {
                const { edges, pageInfo, totalCount } = body.data.todoItems;
                expect(pageInfo).toEqual({
                    endCursor: 'eyJ0eXBlIjoia2V5c2V0IiwiZmllbGRzIjpbeyJmaWVsZCI6ImlkIiwidmFsdWUiOjR9XX0=',
                    hasNextPage: true,
                    hasPreviousPage: true,
                    startCursor: 'eyJ0eXBlIjoia2V5c2V0IiwiZmllbGRzIjpbeyJmaWVsZCI6ImlkIiwidmFsdWUiOjN9XX0=',
                });
                expect(totalCount).toBe(5);
                expect(edges).toHaveLength(2);
                expect(edges.map((e) => e.node)).toEqual([
                    { id: '3', title: 'Create Entity Service', completed: false, description: null, age: expect.any(Number) },
                    {
                        id: '4',
                        title: 'Add Todo Item Resolver',
                        completed: false,
                        description: null,
                        age: expect.any(Number),
                    },
                ]);
            }));
        });
    });
    describe('aggregate', () => {
        it('should require a header secret', () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .send({
            operationName: null,
            variables: {},
            query: `{
            todoItemAggregate {
              ${graphql_fragments_1.todoItemAggregateFields}
            }
        }`,
        })
            .then(({ body }) => {
            expect(body.errors).toHaveLength(1);
            expect(JSON.stringify(body.errors[0])).toContain('Forbidden resource');
        }));
        it(`should return a aggregate response`, () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .set(constants_1.AUTH_HEADER_NAME, config_1.config.auth.header)
            .send({
            operationName: null,
            variables: {},
            query: `{ 
          todoItemAggregate {
              ${graphql_fragments_1.todoItemAggregateFields}
            }
        }`,
        })
            .expect(200)
            .then(({ body }) => {
            const res = body.data.todoItemAggregate;
            expect(res).toEqual([
                {
                    avg: { id: 3 },
                    count: { completed: 5, created: 5, description: 0, id: 5, title: 5, updated: 5 },
                    max: { description: null, id: '5', title: 'How to create item With Sub Tasks' },
                    min: { description: null, id: '1', title: 'Add Todo Item Resolver' },
                    sum: { id: 15 },
                },
            ]);
        }));
        it(`should return a aggregate response with groupBy`, () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .set(constants_1.AUTH_HEADER_NAME, config_1.config.auth.header)
            .send({
            operationName: null,
            variables: {},
            query: `{ 
          todoItemAggregate {
              groupBy {
                completed
              }
              ${graphql_fragments_1.todoItemAggregateFields}
            }
        }`,
        })
            .expect(200)
            .then(({ body }) => {
            const res = body.data.todoItemAggregate;
            expect(res).toEqual([
                {
                    groupBy: { completed: false },
                    avg: { id: 3.5 },
                    count: { completed: 4, created: 4, description: 0, id: 4, title: 4, updated: 4 },
                    max: { description: null, id: '5', title: 'How to create item With Sub Tasks' },
                    min: { description: null, id: '2', title: 'Add Todo Item Resolver' },
                    sum: { id: 14 },
                },
                {
                    groupBy: { completed: true },
                    avg: { id: 1 },
                    count: { completed: 1, created: 1, description: 0, id: 1, title: 1, updated: 1 },
                    max: { description: null, id: '1', title: 'Create Nest App' },
                    min: { description: null, id: '1', title: 'Create Nest App' },
                    sum: { id: 1 },
                },
            ]);
        }));
        it(`should allow filtering`, () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .set(constants_1.AUTH_HEADER_NAME, config_1.config.auth.header)
            .send({
            operationName: null,
            variables: {},
            query: `{ 
          todoItemAggregate(filter: { completed: { is: false } }) {
              ${graphql_fragments_1.todoItemAggregateFields}
            }
        }`,
        })
            .expect(200)
            .then(({ body }) => {
            const res = body.data.todoItemAggregate;
            expect(res).toEqual([
                {
                    count: { id: 4, title: 4, description: 0, completed: 4, created: 4, updated: 4 },
                    sum: { id: 14 },
                    avg: { id: 3.5 },
                    min: { id: '2', title: 'Add Todo Item Resolver', description: null },
                    max: { id: '5', title: 'How to create item With Sub Tasks', description: null },
                },
            ]);
        }));
    });
    describe('create one', () => {
        it('should require a header secret', () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .send({
            operationName: null,
            variables: {},
            query: `mutation {
            createOneTodoItem(
              input: {
                todoItem: { title: "Test Todo", completed: false }
              }
            ) {
              id
              title
              completed
            }
        }`,
        })
            .then(({ body }) => {
            expect(body.errors).toHaveLength(1);
            expect(JSON.stringify(body.errors[0])).toContain('Forbidden resource');
        }));
        it('should allow creating a todoItem', () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .set(constants_1.AUTH_HEADER_NAME, config_1.config.auth.header)
            .send({
            operationName: null,
            variables: {},
            query: `mutation {
            createOneTodoItem(
              input: {
                todoItem: { title: "Test Todo", completed: false }
              }
            ) {
              id
              title
              completed
            }
        }`,
        })
            .expect(200, {
            data: {
                createOneTodoItem: {
                    id: '6',
                    title: 'Test Todo',
                    completed: false,
                },
            },
        }));
        it('should validate a todoItem', () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .set(constants_1.AUTH_HEADER_NAME, config_1.config.auth.header)
            .send({
            operationName: null,
            variables: {},
            query: `mutation {
            createOneTodoItem(
              input: {
                todoItem: { title: "Test Todo with a too long title!", completed: false }
              }
            ) {
              id
              title
              completed
            }
        }`,
        })
            .expect(200)
            .then(({ body }) => {
            expect(body.errors).toHaveLength(1);
            expect(JSON.stringify(body.errors[0])).toContain('title must be shorter than or equal to 20 characters');
        }));
    });
    describe('create many', () => {
        it('should require a header secret', () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .send({
            operationName: null,
            variables: {},
            query: `mutation {
            createManyTodoItems(
              input: {
                todoItems: [{ title: "Test Todo", completed: false }]
              }
            ) {
              id
              title
              completed
            }
        }`,
        })
            .expect(200)
            .then(({ body }) => {
            expect(body.errors).toHaveLength(1);
            expect(JSON.stringify(body.errors[0])).toContain('Forbidden resource');
        }));
        it('should allow creating a todoItem', () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .set(constants_1.AUTH_HEADER_NAME, config_1.config.auth.header)
            .send({
            operationName: null,
            variables: {},
            query: `mutation {
            createManyTodoItems(
              input: {
                todoItems: [
                  { title: "Many Test Todo 1", completed: false },
                  { title: "Many Test Todo 2", completed: true }
                ]
              }
            ) {
              id
              title
              completed
            }
        }`,
        })
            .expect(200, {
            data: {
                createManyTodoItems: [
                    { id: '7', title: 'Many Test Todo 1', completed: false },
                    { id: '8', title: 'Many Test Todo 2', completed: true },
                ],
            },
        }));
        it('should validate a todoItem', () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .set(constants_1.AUTH_HEADER_NAME, config_1.config.auth.header)
            .send({
            operationName: null,
            variables: {},
            query: `mutation {
            createManyTodoItems(
              input: {
                todoItems: [{ title: "Test Todo With A Really Long Title", completed: false }]
              }
            ) {
              id
              title
              completed
            }
        }`,
        })
            .expect(200)
            .then(({ body }) => {
            expect(body.errors).toHaveLength(1);
            expect(JSON.stringify(body.errors[0])).toContain('title must be shorter than or equal to 20 characters');
        }));
    });
    describe('update one', () => {
        it('should require a header secret', () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .send({
            operationName: null,
            variables: {},
            query: `mutation {
            updateOneTodoItem(
              input: {
                id: "6",
                update: { title: "Update Test Todo", completed: true }
              }
            ) {
              id
              title
              completed
            }
        }`,
        })
            .then(({ body }) => {
            expect(body.errors).toHaveLength(1);
            expect(JSON.stringify(body.errors[0])).toContain('Forbidden resource');
        }));
        it('should allow updating a todoItem', () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .set(constants_1.AUTH_HEADER_NAME, config_1.config.auth.header)
            .send({
            operationName: null,
            variables: {},
            query: `mutation {
            updateOneTodoItem(
              input: {
                id: "6",
                update: { title: "Update Test Todo", completed: true }
              }
            ) {
              id
              title
              completed
            }
        }`,
        })
            .expect(200, {
            data: {
                updateOneTodoItem: {
                    id: '6',
                    title: 'Update Test Todo',
                    completed: true,
                },
            },
        }));
        it('should require an id', () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .set(constants_1.AUTH_HEADER_NAME, config_1.config.auth.header)
            .send({
            operationName: null,
            variables: {},
            query: `mutation {
            updateOneTodoItem(
              input: {
                update: { title: "Update Test Todo With A Really Long Title" }
              }
            ) {
              id
              title
              completed
            }
        }`,
        })
            .expect(400)
            .then(({ body }) => {
            expect(body.errors).toHaveLength(1);
            expect(body.errors[0].message).toBe('Field "UpdateOneTodoItemInput.id" of required type "ID!" was not provided.');
        }));
        it('should validate an update', () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .set(constants_1.AUTH_HEADER_NAME, config_1.config.auth.header)
            .send({
            operationName: null,
            variables: {},
            query: `mutation {
            updateOneTodoItem(
              input: {
                id: "6",
                update: { title: "Update Test Todo With A Really Long Title" }
              }
            ) {
              id
              title
              completed
            }
        }`,
        })
            .expect(200)
            .then(({ body }) => {
            expect(body.errors).toHaveLength(1);
            expect(JSON.stringify(body.errors[0])).toContain('title must be shorter than or equal to 20 characters');
        }));
    });
    describe('update many', () => {
        it('should require a header secret', () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .send({
            operationName: null,
            variables: {},
            query: `mutation {
            updateManyTodoItems(
              input: {
                filter: {id: { in: ["7", "8"]} },
                update: { title: "Update Test Todo", completed: true }
              }
            ) {
              updatedCount
            }
        }`,
        })
            .then(({ body }) => {
            expect(body.errors).toHaveLength(1);
            expect(JSON.stringify(body.errors[0])).toContain('Forbidden resource');
        }));
        it('should allow updating a todoItem', () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .set(constants_1.AUTH_HEADER_NAME, config_1.config.auth.header)
            .send({
            operationName: null,
            variables: {},
            query: `mutation {
            updateManyTodoItems(
              input: {
                filter: {id: { in: ["7", "8"]} },
                update: { title: "Update Many Test", completed: true }
              }
            ) {
              updatedCount
            }
        }`,
        })
            .expect(200, {
            data: {
                updateManyTodoItems: {
                    updatedCount: 2,
                },
            },
        }));
        it('should require a filter', () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .set(constants_1.AUTH_HEADER_NAME, config_1.config.auth.header)
            .send({
            operationName: null,
            variables: {},
            query: `mutation {
            updateManyTodoItems(
              input: {
                update: { title: "Update Many Test", completed: true }
              }
            ) {
              updatedCount
            }
        }`,
        })
            .expect(400)
            .then(({ body }) => {
            expect(body.errors).toHaveLength(1);
            expect(body.errors[0].message).toBe('Field "UpdateManyTodoItemsInput.filter" of required type "TodoItemUpdateFilter!" was not provided.');
        }));
        it('should require a non-empty filter', () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .set(constants_1.AUTH_HEADER_NAME, config_1.config.auth.header)
            .send({
            operationName: null,
            variables: {},
            query: `mutation {
            updateManyTodoItems(
              input: {
                filter: { },
                update: { title: "Update Many Test", completed: true }
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
        it('should require a header secret', () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .send({
            operationName: null,
            variables: {},
            query: `mutation {
            deleteOneTodoItem(
              input: { id: "6" }
            ) {
              id
              title
              completed
            }
        }`,
        })
            .then(({ body }) => {
            expect(body.errors).toHaveLength(1);
            expect(JSON.stringify(body.errors[0])).toContain('Forbidden resource');
        }));
        it('should allow deleting a todoItem', () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .set(constants_1.AUTH_HEADER_NAME, config_1.config.auth.header)
            .send({
            operationName: null,
            variables: {},
            query: `mutation {
            deleteOneTodoItem(
              input: { id: "6" }
            ) {
              id
              title
              completed
            }
        }`,
        })
            .expect(200, {
            data: {
                deleteOneTodoItem: {
                    id: '6',
                    title: 'Update Test Todo',
                    completed: true,
                },
            },
        }));
        it('should require an id', () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .set(constants_1.AUTH_HEADER_NAME, config_1.config.auth.header)
            .send({
            operationName: null,
            variables: {},
            query: `mutation {
            deleteOneTodoItem(
              input: { }
            ) {
              id
              title
              completed
            }
        }`,
        })
            .expect(400)
            .then(({ body }) => {
            expect(body.errors).toHaveLength(1);
            expect(body.errors[0].message).toBe('Field "DeleteOneTodoItemInput.id" of required type "ID!" was not provided.');
        }));
    });
    describe('delete many', () => {
        it('should require a header secret', () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .send({
            operationName: null,
            variables: {},
            query: `mutation {
            deleteManyTodoItems(
              input: {
                filter: {id: { in: ["7", "8"]} },
              }
            ) {
              deletedCount
            }
        }`,
        })
            .then(({ body }) => {
            expect(body.errors).toHaveLength(1);
            expect(JSON.stringify(body.errors[0])).toContain('Forbidden resource');
        }));
        it('should allow deleting many todoItems', () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .set(constants_1.AUTH_HEADER_NAME, config_1.config.auth.header)
            .send({
            operationName: null,
            variables: {},
            query: `mutation {
            deleteManyTodoItems(
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
                deleteManyTodoItems: {
                    deletedCount: 2,
                },
            },
        }));
        it('should require a filter', () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .set(constants_1.AUTH_HEADER_NAME, config_1.config.auth.header)
            .send({
            operationName: null,
            variables: {},
            query: `mutation {
            deleteManyTodoItems(
              input: { }
            ) {
              deletedCount
            }
        }`,
        })
            .expect(400)
            .then(({ body }) => {
            expect(body.errors).toHaveLength(1);
            expect(body.errors[0].message).toBe('Field "DeleteManyTodoItemsInput.filter" of required type "TodoItemDeleteFilter!" was not provided.');
        }));
        it('should require a non-empty filter', () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .set(constants_1.AUTH_HEADER_NAME, config_1.config.auth.header)
            .send({
            operationName: null,
            variables: {},
            query: `mutation {
            deleteManyTodoItems(
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
    describe('addSubTasksToTodoItem', () => {
        it('allow adding subTasks to a todoItem', () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .set(constants_1.AUTH_HEADER_NAME, config_1.config.auth.header)
            .send({
            operationName: null,
            variables: {},
            query: `mutation {
            addSubTasksToTodoItem(
              input: {
                id: 1,
                relationIds: ["4", "5", "6"]
              }
            ) {
              id
              title
              subTasks {
                ${graphql_fragments_1.pageInfoField}
                ${(0, graphql_fragments_1.edgeNodes)(graphql_fragments_1.subTaskFields)}
                totalCount
              }
            }
        }`,
        })
            .expect(200)
            .then(({ body }) => {
            const { edges, pageInfo, totalCount } = body.data.addSubTasksToTodoItem.subTasks;
            expect(body.data.addSubTasksToTodoItem.id).toBe('1');
            expect(pageInfo).toEqual({
                endCursor: 'YXJyYXljb25uZWN0aW9uOjU=',
                hasNextPage: false,
                hasPreviousPage: false,
                startCursor: 'YXJyYXljb25uZWN0aW9uOjA=',
            });
            expect(totalCount).toBe(6);
            expect(edges).toHaveLength(6);
            edges.forEach((e) => expect(e.node.todoItemId).toBe(1));
        }));
    });
    describe('addTagsToTodoItem', () => {
        it('allow adding subTasks to a todoItem', () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .set(constants_1.AUTH_HEADER_NAME, config_1.config.auth.header)
            .send({
            operationName: null,
            variables: {},
            query: `mutation {
            addTagsToTodoItem(
              input: {
                id: 1,
                relationIds: ["3", "4", "5"]
              }
            ) {
              id
              title
              tags(sorting: [{ field: id, direction: ASC }]) {
                ${graphql_fragments_1.pageInfoField}
                ${(0, graphql_fragments_1.edgeNodes)(graphql_fragments_1.tagFields)}
                totalCount
              }
            }
        }`,
        })
            .expect(200)
            .then(({ body }) => {
            const { edges, pageInfo, totalCount } = body.data.addTagsToTodoItem.tags;
            expect(body.data.addTagsToTodoItem.id).toBe('1');
            expect(pageInfo).toEqual({
                endCursor: 'YXJyYXljb25uZWN0aW9uOjQ=',
                hasNextPage: false,
                hasPreviousPage: false,
                startCursor: 'YXJyYXljb25uZWN0aW9uOjA=',
            });
            expect(totalCount).toBe(5);
            expect(edges).toHaveLength(5);
            expect(edges.map((e) => e.node.name)).toEqual(['Urgent', 'Home', 'Work', 'Question', 'Blocked']);
        }));
    });
    describe('removeTagsFromTodoItem', () => {
        it('allow adding subTasks to a todoItem', () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .set(constants_1.AUTH_HEADER_NAME, config_1.config.auth.header)
            .send({
            operationName: null,
            variables: {},
            query: `mutation {
            removeTagsFromTodoItem(
              input: {
                id: 1,
                relationIds: ["3", "4", "5"]
              }
            ) {
              id
              title
              tags(sorting: [{ field: id, direction: ASC }]) {
                ${graphql_fragments_1.pageInfoField}
                ${(0, graphql_fragments_1.edgeNodes)(graphql_fragments_1.tagFields)}
                totalCount
              }
            }
        }`,
        })
            .expect(200)
            .then(({ body }) => {
            const { edges, pageInfo, totalCount } = body.data.removeTagsFromTodoItem.tags;
            expect(body.data.removeTagsFromTodoItem.id).toBe('1');
            expect(pageInfo).toEqual({
                endCursor: 'YXJyYXljb25uZWN0aW9uOjE=',
                hasNextPage: false,
                hasPreviousPage: false,
                startCursor: 'YXJyYXljb25uZWN0aW9uOjA=',
            });
            expect(totalCount).toBe(2);
            expect(edges).toHaveLength(2);
            expect(edges.map((e) => e.node.name)).toEqual(['Urgent', 'Home']);
        }));
    });
    describe('setTagsOnTodoItem', () => {
        it('allow settings tags on a todoItem', () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .set(constants_1.AUTH_HEADER_NAME, config_1.config.auth.header)
            .send({
            operationName: null,
            variables: {},
            query: `mutation {
            setTagsOnTodoItem(
              input: {
                id: 1,
                relationIds: [1, 2, 3, 4, 5]
              }
            ) {
              id
              title
              tags(sorting: [{ field: id, direction: ASC }]) {
                ${graphql_fragments_1.pageInfoField}
                ${(0, graphql_fragments_1.edgeNodes)(graphql_fragments_1.tagFields)}
                totalCount
              }
            }
        }`,
        })
            .expect(200)
            .then(({ body }) => {
            const { edges, pageInfo, totalCount } = body.data.setTagsOnTodoItem.tags;
            expect(body.data.setTagsOnTodoItem.id).toBe('1');
            expect(pageInfo).toEqual({
                endCursor: 'YXJyYXljb25uZWN0aW9uOjQ=',
                hasNextPage: false,
                hasPreviousPage: false,
                startCursor: 'YXJyYXljb25uZWN0aW9uOjA=',
            });
            expect(totalCount).toBe(5);
            expect(edges).toHaveLength(5);
            expect(edges.map((e) => e.node.name)).toEqual(['Urgent', 'Home', 'Work', 'Question', 'Blocked']);
        }));
        it('allow settings tags to a todoItem to an empty array', () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .set(constants_1.AUTH_HEADER_NAME, config_1.config.auth.header)
            .send({
            operationName: null,
            variables: {},
            query: `mutation {
            setTagsOnTodoItem(
              input: {
                id: 1,
                relationIds: []
              }
            ) {
              id
              title
              tags(sorting: [{ field: id, direction: ASC }]) {
                ${graphql_fragments_1.pageInfoField}
                ${(0, graphql_fragments_1.edgeNodes)(graphql_fragments_1.tagFields)}
                totalCount
              }
            }
        }`,
        })
            .expect(200)
            .then(({ body }) => {
            const { edges, pageInfo, totalCount } = body.data.setTagsOnTodoItem.tags;
            expect(body.data.setTagsOnTodoItem.id).toBe('1');
            expect(pageInfo).toEqual({
                endCursor: null,
                hasNextPage: false,
                hasPreviousPage: false,
                startCursor: null,
            });
            expect(totalCount).toBe(0);
            expect(edges).toHaveLength(0);
            expect(edges.map((e) => e.node.name)).toEqual([]);
        }));
    });
    afterAll(async () => {
        await app.close();
    });
});
//# sourceMappingURL=todo-item.resolver.spec.js.map