import { Connection } from 'mongoose';
export declare const TAGS: {
    id: string;
    name: string;
}[];
export declare const TODO_ITEMS: {
    id: string;
    title: string;
    completed: boolean;
    priority: number;
    tags: string[];
}[];
export declare const SUB_TASKS: {
    id: string;
    completed: boolean;
    description: null;
    title: string;
    todoItem: string;
}[];
export declare const truncate: (connection: Connection) => Promise<void>;
export declare const refresh: (connection: Connection) => Promise<void>;
