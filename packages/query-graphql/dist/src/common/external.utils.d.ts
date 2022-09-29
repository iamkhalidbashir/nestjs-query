import { ObjectTypeMetadata } from '@nestjs/graphql/dist/schema-builder/metadata/object-type.metadata';
import { EnumMetadata } from '@nestjs/graphql/dist/schema-builder/metadata';
import { Class } from '@nestjs-query/core';
/**
 * @internal
 */
export declare function findGraphqlObjectMetadata<T>(objType: Class<T>): ObjectTypeMetadata | undefined;
export declare function getGraphqlObjectMetadata<T>(objType: Class<T>, notFoundMsg: string): ObjectTypeMetadata;
export declare function getGraphqlObjectName<DTO>(DTOClass: Class<DTO>, notFoundMsg: string): string;
export declare function getGraphqlEnumMetadata(objType: object): EnumMetadata | undefined;
