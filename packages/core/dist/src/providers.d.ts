import { Provider } from '@nestjs/common';
import { Assembler } from './assemblers';
import { Class } from './common';
export declare const createServices: (opts: Class<Assembler<unknown, unknown, unknown, unknown, unknown, unknown>>[]) => Provider[];
