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
