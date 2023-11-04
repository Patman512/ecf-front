import { db } from '../../database/mySQL';
import { Callback } from '../../types';
import { Rating } from './ratings-types';

export const getApprovedRatings = (cb: Callback<Rating[]>) => {
    db.query(
        `SELECT
            id,
            authorName,
            comment,
            rating,
            creationDateUnix,
            approved,
            approverId
        FROM Ratings
        WHERE approved = 1`,
        (error, results) => {
            if (error) {
                return cb(error);
            }

            return cb(null, results as Rating[]);
        }
    );
};
