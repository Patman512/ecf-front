export interface Service {
    id: number;
    name: string;
    description: string | null;
}

export interface InsertServiceParams {
    name: string;
    description?: string;
}

export interface UpdateServiceParams {
    id: number;
    name: string;
    description: string;
}
