import { ResolverMethodOpts } from '../../decorators';
import { RelationTypeMap, ResolverRelation, ResolverRelationReference } from './relations.interface';
export declare const flattenRelations: <RT extends ResolverRelation<unknown> | ResolverRelationReference<unknown, unknown>>(relationOptions: RelationTypeMap<RT>) => RT[];
export declare const removeRelationOpts: <Relation>(opts: ResolverRelation<Relation> | ResolverRelationReference<unknown, Relation>) => ResolverMethodOpts;
