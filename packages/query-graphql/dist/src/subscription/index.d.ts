import { Class } from '@nestjs-query/core';
import { DTONamesOpts } from '../common';
import { GraphQLPubSub } from './pub-sub.interface';
export { GraphQLPubSub } from './pub-sub.interface';
export declare enum EventType {
    CREATED = "created",
    UPDATED_ONE = "updatedOne",
    UPDATED_MANY = "updatedMany",
    DELETED_ONE = "deletedOne",
    DELETED_MANY = "deletedMany"
}
export declare const getDTOEventName: <DTO>(type: EventType, DTOClass: Class<DTO>, opts?: DTONamesOpts | undefined) => string;
export declare const pubSubToken: () => string;
export declare const defaultPubSub: () => GraphQLPubSub;
