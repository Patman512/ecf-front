import { ResultSetHeader } from 'mysql2';
import { db } from '../../database/mySQL';
import { Callback } from '../../types';
import { InsertRatingParams, Rating } from './ratings-types';

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

export const insertRating = (params: InsertRatingParams, cb: Callback<ResultSetHeader>) => {
    const { name, comment, rating } = params;

    db.query(
        `INSERT INTO Ratings (authorName, comment, rating, creationDateUnix) VALUES (?, ?, ?, UNIX_TIMESTAMP())`,
        [name, comment, rating],
        (error, result) => {
            if (error) {
                return cb(error);
            }

            return cb(null, result as ResultSetHeader);
        }
    );
};
