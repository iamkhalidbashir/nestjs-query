"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const testing_1 = require("@nestjs/testing");
const supertest_1 = (0, tslib_1.__importDefault)(require("supertest"));
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const app_module_1 = require("../src/app.module");
const fixtures_1 = require("./fixtures");
const graphql_fragments_1 = require("./graphql-fragments");
describe('Federated - UserResolver (e2e)', () => {
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
        await (0, fixtures_1.refresh)(app.get(typeorm_1.Connection));
    });
    afterAll(() => (0, fixtures_1.refresh)(app.get(typeorm_1.Connection)));
    describe('find one', () => {
        it(`should find a user by id`, () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .send({
            operationName: null,
            variables: {},
            query: `{
          user(id: 1) {
            ${graphql_fragments_1.userFields}
          }
        }`,
        })
            .expect(200)
            .then(({ body }) => {
            expect(body).toEqual({
                data: {
                    user: {
                        id: '1',
                        name: 'User 1',
                        email: 'user1@example.com',
                    },
                },
            });
        }));
        it(`should return null if the user is not found`, () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .send({
            operationName: null,
            variables: {},
            query: `{
          user(id: 100) {
            ${graphql_fragments_1.userFields}
          }
        }`,
        })
            .expect(200, {
            data: {
                user: null,
            },
        }));
    });
    describe('query', () => {
        it(`should return a connection`, () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .send({
            operationName: null,
            variables: {},
            query: `{
          users {
            ${graphql_fragments_1.pageInfoField}
            ${(0, graphql_fragments_1.edgeNodes)(graphql_fragments_1.userFields)}
          }
        }`,
        })
            .expect(200)
            .then(({ body }) => {
            const { edges, pageInfo } = body.data.users;
            expect(pageInfo).toEqual({
                endCursor: 'YXJyYXljb25uZWN0aW9uOjI=',
                hasNextPage: false,
                hasPreviousPage: false,
                startCursor: 'YXJyYXljb25uZWN0aW9uOjA=',
            });
            expect(edges).toHaveLength(3);
            expect(edges.map((e) => e.node)).toEqual([
                { id: '1', name: 'User 1', email: 'user1@example.com' },
                { id: '2', name: 'User 2', email: 'user2@example.com' },
                { id: '3', name: 'User 3', email: 'user3@example.com' },
            ]);
        }));
        it(`should allow querying`, () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .send({
            operationName: null,
            variables: {},
            query: `{
          users(filter: { id: { in: [1, 2] } }) {
            ${graphql_fragments_1.pageInfoField}
            ${(0, graphql_fragments_1.edgeNodes)(graphql_fragments_1.userFields)}
          }
        }`,
        })
            .expect(200)
            .then(({ body }) => {
            const { edges, pageInfo } = body.data.users;
            expect(pageInfo).toEqual({
                endCursor: 'YXJyYXljb25uZWN0aW9uOjE=',
                hasNextPage: false,
                hasPreviousPage: false,
                startCursor: 'YXJyYXljb25uZWN0aW9uOjA=',
            });
            expect(edges).toHaveLength(2);
            expect(edges.map((e) => e.node)).toEqual([
                { id: '1', name: 'User 1', email: 'user1@example.com' },
                { id: '2', name: 'User 2', email: 'user2@example.com' },
            ]);
        }));
        it(`should allow sorting`, () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .send({
            operationName: null,
            variables: {},
            query: `{
          users(sorting: [{field: id, direction: DESC}]) {
            ${graphql_fragments_1.pageInfoField}
            ${(0, graphql_fragments_1.edgeNodes)(graphql_fragments_1.userFields)}
          }
        }`,
        })
            .expect(200)
            .then(({ body }) => {
            const { edges, pageInfo } = body.data.users;
            expect(pageInfo).toEqual({
                endCursor: 'YXJyYXljb25uZWN0aW9uOjI=',
                hasNextPage: false,
                hasPreviousPage: false,
                startCursor: 'YXJyYXljb25uZWN0aW9uOjA=',
            });
            expect(edges).toHaveLength(3);
            expect(edges.map((e) => e.node)).toEqual([
                { id: '3', name: 'User 3', email: 'user3@example.com' },
                { id: '2', name: 'User 2', email: 'user2@example.com' },
                { id: '1', name: 'User 1', email: 'user1@example.com' },
            ]);
        }));
        describe('paging', () => {
            it(`should allow paging with the 'first' field`, () => (0, supertest_1.default)(app.getHttpServer())
                .post('/graphql')
                .send({
                operationName: null,
                variables: {},
                query: `{
              users(paging: {first: 2}) {
            ${graphql_fragments_1.pageInfoField}
            ${(0, graphql_fragments_1.edgeNodes)(graphql_fragments_1.userFields)}
          }
        }`,
            })
                .expect(200)
                .then(({ body }) => {
                const { edges, pageInfo } = body.data.users;
                expect(pageInfo).toEqual({
                    endCursor: 'YXJyYXljb25uZWN0aW9uOjE=',
                    hasNextPage: true,
                    hasPreviousPage: false,
                    startCursor: 'YXJyYXljb25uZWN0aW9uOjA=',
                });
                expect(edges).toHaveLength(2);
                expect(edges.map((e) => e.node)).toEqual([
                    { id: '1', name: 'User 1', email: 'user1@example.com' },
                    { id: '2', name: 'User 2', email: 'user2@example.com' },
                ]);
            }));
            it(`should allow paging with the 'first' field and 'after'`, () => (0, supertest_1.default)(app.getHttpServer())
                .post('/graphql')
                .send({
                operationName: null,
                variables: {},
                query: `{
          users(paging: {first: 2, after: "YXJyYXljb25uZWN0aW9uOjA="}) {
            ${graphql_fragments_1.pageInfoField}
            ${(0, graphql_fragments_1.edgeNodes)(graphql_fragments_1.userFields)}
          }
        }`,
            })
                .expect(200)
                .then(({ body }) => {
                const { edges, pageInfo } = body.data.users;
                expect(pageInfo).toEqual({
                    endCursor: 'YXJyYXljb25uZWN0aW9uOjI=',
                    hasNextPage: false,
                    hasPreviousPage: true,
                    startCursor: 'YXJyYXljb25uZWN0aW9uOjE=',
                });
                expect(edges).toHaveLength(2);
                expect(edges.map((e) => e.node)).toEqual([
                    { id: '2', name: 'User 2', email: 'user2@example.com' },
                    { id: '3', name: 'User 3', email: 'user3@example.com' },
                ]);
            }));
        });
    });
    describe('create one', () => {
        it('should allow creating a user', () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .send({
            operationName: null,
            variables: {},
            query: `mutation {
            createOneUser(
              input: {
                user: { name: "User 4", email: "user4@example.com" }
              }
            ) {
              id
              name
              email
            }
        }`,
        })
            .expect(200, {
            data: {
                createOneUser: {
                    id: '4',
                    name: 'User 4',
                    email: 'user4@example.com',
                },
            },
        }));
        it('should validate a user', () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .send({
            operationName: null,
            variables: {},
            query: `mutation {
            createOneUser(
              input: {
                user: { name: "User 5", email: "This is not a valid email" }
              }
            ) {
              id
              name
              email
            }
        }`,
        })
            .expect(200)
            .then(({ body }) => {
            expect(body.errors).toHaveLength(1);
            expect(JSON.stringify(body.errors[0])).toContain('email must be an email');
        }));
    });
    describe('create many', () => {
        it('should allow creating a user', () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .send({
            operationName: null,
            variables: {},
            query: `mutation {
            createManyUsers(
              input: {
                users: [
                  { name: "User 5", email: "user5@example.com" },
                  { name: "User 6", email: "user6@example.com" }
                ]
              }
            ) {
              id
              name
              email
            }
        }`,
        })
            .expect(200, {
            data: {
                createManyUsers: [
                    { id: '5', name: 'User 5', email: 'user5@example.com' },
                    { id: '6', name: 'User 6', email: 'user6@example.com' },
                ],
            },
        }));
        it('should validate a user', () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .send({
            operationName: null,
            variables: {},
            query: `mutation {
            createManyUsers(
              input: {
                users: [{ name: "User 7", email: "This is not a valid email" }]
              }
            ) {
              id
              name
              email
            }
        }`,
        })
            .expect(200)
            .then(({ body }) => {
            expect(body.errors).toHaveLength(1);
            expect(JSON.stringify(body.errors[0])).toContain('email must be an email');
        }));
    });
    describe('update one', () => {
        it('should allow updating a user', () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .send({
            operationName: null,
            variables: {},
            query: `mutation {
            updateOneUser(
              input: {
                id: "6",
                update: { name: "User 6a", email: "user6a@example.com" }
              }
            ) {
              id
              name
              email
            }
        }`,
        })
            .expect(200, {
            data: {
                updateOneUser: {
                    id: '6',
                    name: 'User 6a',
                    email: 'user6a@example.com',
                },
            },
        }));
        it('should require an id', () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .send({
            operationName: null,
            variables: {},
            query: `mutation {
            updateOneUser(
              input: {
                update: { name: "User X" }
              }
            ) {
              id
              name
              email
            }
        }`,
        })
            .expect(400)
            .then(({ body }) => {
            expect(body.errors).toHaveLength(1);
            expect(body.errors[0].message).toBe('Field "UpdateOneUserInput.id" of required type "ID!" was not provided.');
        }));
        it('should validate an update', () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .send({
            operationName: null,
            variables: {},
            query: `mutation {
            updateOneUser(
              input: {
                id: "6",
                update: { email: "This is not a valid email address" }
              }
            ) {
              id
              name
              email
            }
        }`,
        })
            .expect(200)
            .then(({ body }) => {
            expect(body.errors).toHaveLength(1);
            expect(JSON.stringify(body.errors[0])).toContain('email must be an email');
        }));
    });
    describe('update many', () => {
        it('should allow updating a user', () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .send({
            operationName: null,
            variables: {},
            query: `mutation {
            updateManyUsers(
              input: {
                filter: {id: { in: ["5", "6"]} },
                update: { name: "New Users" }
              }
            ) {
              updatedCount
            }
        }`,
        })
            .expect(200, {
            data: {
                updateManyUsers: {
                    updatedCount: 2,
                },
            },
        }));
        it('should require a filter', () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .send({
            operationName: null,
            variables: {},
            query: `mutation {
            updateManyUsers(
              input: {
                update: { name: "New users" }
              }
            ) {
              updatedCount
            }
        }`,
        })
            .expect(400)
            .then(({ body }) => {
            expect(body.errors).toHaveLength(1);
            expect(body.errors[0].message).toBe('Field "UpdateManyUsersInput.filter" of required type "UserUpdateFilter!" was not provided.');
        }));
        it('should require a non-empty filter', () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .send({
            operationName: null,
            variables: {},
            query: `mutation {
            updateManyUsers(
              input: {
                filter: { },
                update: { name: "New users" }
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
        it('should allow deleting a user', () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .send({
            operationName: null,
            variables: {},
            query: `mutation {
            deleteOneUser(
              input: { id: "6" }
            ) {
              id
              name
              email
            }
        }`,
        })
            .expect(200, {
            data: {
                deleteOneUser: {
                    id: null,
                    name: 'New Users',
                    email: 'user6a@example.com',
                },
            },
        }));
        it('should require an id', () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .send({
            operationName: null,
            variables: {},
            query: `mutation {
            deleteOneUser(
              input: { }
            ) {
              id
              name
              email
            }
        }`,
        })
            .expect(400)
            .then(({ body }) => {
            expect(body.errors).toHaveLength(1);
            expect(body.errors[0].message).toBe('Field "DeleteOneUserInput.id" of required type "ID!" was not provided.');
        }));
    });
    describe('delete many', () => {
        it('should allow deleting a user', () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .send({
            operationName: null,
            variables: {},
            query: `mutation {
            deleteManyUsers(
              input: {
                filter: {id: { in: ["4", "5"]} },
              }
            ) {
              deletedCount
            }
        }`,
        })
            .expect(200, {
            data: {
                deleteManyUsers: {
                    deletedCount: 2,
                },
            },
        }));
        it('should require a filter', () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .send({
            operationName: null,
            variables: {},
            query: `mutation {
            deleteManyUsers(
              input: { }
            ) {
              deletedCount
            }
        }`,
        })
            .expect(400)
            .then(({ body }) => {
            expect(body.errors).toHaveLength(1);
            expect(body.errors[0].message).toBe('Field "DeleteManyUsersInput.filter" of required type "UserDeleteFilter!" was not provided.');
        }));
        it('should require a non-empty filter', () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .send({
            operationName: null,
            variables: {},
            query: `mutation {
            deleteManyUsers(
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
    afterAll(async () => {
        await app.close();
    });
});
//# sourceMappingURL=user.resolver.spec.js.map