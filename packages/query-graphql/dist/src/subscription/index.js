"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultPubSub = exports.pubSubToken = exports.getDTOEventName = exports.EventType = void 0;
const graphql_subscriptions_1 = require("graphql-subscriptions");
const common_1 = require("../common");
var EventType;
(function (EventType) {
    EventType["CREATED"] = "created";
    EventType["UPDATED_ONE"] = "updatedOne";
    EventType["UPDATED_MANY"] = "updatedMany";
    EventType["DELETED_ONE"] = "deletedOne";
    EventType["DELETED_MANY"] = "deletedMany";
})(EventType = exports.EventType || (exports.EventType = {}));
const getDTOEventName = (type, DTOClass, opts) => {
    const { baseName, pluralBaseName } = (0, common_1.getDTONames)(DTOClass, opts);
    if (type === EventType.DELETED_MANY || type === EventType.UPDATED_MANY) {
        return `${type}${pluralBaseName}`;
    }
    return `${type}${baseName}`;
};
exports.getDTOEventName = getDTOEventName;
const pubSubToken = () => 'pub_sub';
exports.pubSubToken = pubSubToken;
let pubSub;
const defaultPubSub = () => {
    if (!pubSub) {
        pubSub = new graphql_subscriptions_1.PubSub();
    }
    return pubSub;
};
exports.defaultPubSub = defaultPubSub;
//# sourceMappingURL=index.js.map