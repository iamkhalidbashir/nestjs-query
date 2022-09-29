export declare class TodoItemDTO {
    id: number;
    title: string;
    description?: string;
    completed: boolean;
    created: Date;
    updated: Date;
    priority: number;
    createdBy?: string;
    updatedBy?: string;
}
