import { ResultSetHeader } from 'mysql2';
import { db } from '../../database/mySQL';
import { Callback } from '../../types';
import { InsertRatingParams, Rating, UpdateRatingApprovalParams } from './ratings-types';

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

export const getAllRatings = (cb: Callback<Rating[]>) => {
    db.query(
        `SELECT
            id,
            authorName,
            comment,
            rating,
            creationDateUnix,
            approved,
            approverId
        FROM Ratings`,
        (error, results) => {
            if (error) {
                return cb(error);
            }

            return cb(null, results as Rating[]);
        }
    );
};

export const insertRating = (params: InsertRatingParams, cb: Callback<ResultSetHeader>) => {
    const { name, comment, rating } = params;

    db.query(
        `INSERT INTO Ratings
            (authorName, comment, rating, creationDateUnix)
        VALUES
            (?, ?, ?, UNIX_TIMESTAMP())
        ON DUPLICATE KEY UPDATE
            authorName = VALUES(authorName),
            comment = VALUES(comment),
            rating = VALUES(rating),
            creationDateUnix = VALUES(creationDateUnix),
            approved = 0,
            approverId = null`,
        [name, comment, rating],
        (error, result) => {
            if (error) {
                return cb(error);
            }

            return cb(null, result as ResultSetHeader);
        }
    );
};

export const updateRatingApproval = (params: UpdateRatingApprovalParams, cb: Callback<ResultSetHeader>) => {
    const { ratingId, approverId } = params;

    db.query(
        `UPDATE Ratings SET
            approved = 1,
            approverId = ?
        WHERE id = ?`,
        [approverId, ratingId],
        (error, result) => {
            if (error) {
                return cb(error);
            }

            return cb(null, result as ResultSetHeader);
        }
    );
};
