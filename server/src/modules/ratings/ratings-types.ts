export interface Rating {
    id: number;
    authorName: string;
    comment: string | null;
    rating: number;
    creationDateUnix: number;
    approved: boolean;
    approverId: number | null;
}

export interface InsertRatingParams {
    name: string;
    comment: string | null;
    rating: number;
}

export interface UpdateRatingApprovalParams {
    ratingId: number;
    approverId: number;
}
