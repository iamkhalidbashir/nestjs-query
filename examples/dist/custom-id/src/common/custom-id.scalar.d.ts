import { CustomScalar } from '@nestjs/graphql';
import { ValueNode } from 'graphql';
export declare class CustomIDScalar implements CustomScalar<string, number> {
    description: string;
    private idPrefix;
    parseValue(value: string): number;
    serialize(value: number): string;
    parseLiteral(ast: ValueNode): number | null;
}
