import { Callback } from '../../types';
import { updateRatingApproval } from './ratings-queries';
import { UpdateRatingApprovalParams } from './ratings-types';

export const approveRating = (params: UpdateRatingApprovalParams, cb: Callback<boolean>) => {
    const { ratingId, approverId } = params;

    if (!ratingId || !approverId) {
        return cb(new Error('Invalid input.'));
    }

    return updateRatingApproval(params, (error, result) => {
        if (error) {
            return cb(error);
        }

        return cb(null, result?.affectedRows === 1);
    });
};
