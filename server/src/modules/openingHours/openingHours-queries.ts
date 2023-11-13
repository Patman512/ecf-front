import { ResultSetHeader } from 'mysql2';
import { db } from '../../database/mySQL';
import { Callback } from '../../types';
import { OpeningHour } from './openingHours-types';

export const getOpeningHours = (cb: Callback<OpeningHour[]>) => {
    db.query(
        `SELECT
            id,
            dayOfWeek,
            openingTime,
            closingTime,
            breakStartTime,
            breakEndTime
        FROM OpeningHours`,
        (error, results) => {
            if (error) {
                return cb(error);
            }

            return cb(null, results as OpeningHour[]);
        }
    );
};

export const updateOpeningHour = (params: OpeningHour, cb: Callback<ResultSetHeader>) => {
    const { id, dayOfWeek, openingTime, closingTime, breakStartTime, breakEndTime } = params;

    db.query(
        `UPDATE OpeningHours SET
            openingTime = ?,
            closingTime = ?,
            breakStartTime = ?,
            breakEndTime = ?
        WHERE id = ? AND dayOfWeek = ?`,
        [openingTime, closingTime, breakStartTime, breakEndTime, id, dayOfWeek],
        (error, result) => {
            if (error) {
                return cb(error);
            }

            return cb(null, result as ResultSetHeader);
        }
    );
};
