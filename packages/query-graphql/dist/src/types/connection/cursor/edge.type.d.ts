import { Class } from '@nestjs-query/core';
import { ConnectionCursorType } from '../../cursor.scalar';
import { EdgeType } from '../interfaces';
export interface EdgeTypeConstructor<DTO> {
    new (node: DTO, cursor: ConnectionCursorType): EdgeType<DTO>;
}
export declare function getOrCreateEdgeType<DTO>(DTOClass: Class<DTO>): EdgeTypeConstructor<DTO>;
