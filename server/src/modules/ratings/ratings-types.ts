export interface Rating {
    id: number;
    authorName: string;
    comment: string | null;
    rating: number;
    creationDateUnix: number;
    approved: boolean;
    approverId: number | null;
}
