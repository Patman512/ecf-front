export interface Service {
    id: number;
    name: string;
    description: string | null;
}

export interface AddServiceParams {
    name: string;
    description?: string;
}

export interface UpdateServiceParams {
    id: number;
    name: string;
    description: string;
}

export interface DeleteServiceParams {
    id: number;
}
