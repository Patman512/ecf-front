import async from 'async';
import { Callback } from '../../types';
import { updateOpeningHour } from './openingHours-queries';
import { EditOpeningHoursParams, OpeningHour } from './openingHours-types';

export const editOpeningHour = (params: OpeningHour, cb: Callback<boolean>) => {
    const { id, dayOfWeek } = params;

    if (!id || !dayOfWeek) {
        return cb(new Error('Invalid input.'));
    }

    return updateOpeningHour(params, (error, result) => {
        if (error) {
            return cb(error);
        }

        return cb(null, result?.affectedRows === 1);
    });
};

export const editOpeningHours = (params: EditOpeningHoursParams, cb: Callback<boolean>) => {
    const { openingHours } = params;

    if (!openingHours.length) {
        return cb(new Error('Invalid input.'));
    }

    return async.mapSeries(openingHours, editOpeningHour, (error, results) => {
        if (error) {
            return cb(error);
        }

        if (results?.some((result) => !result)) {
            return cb(null, false);
        }

        return cb(null, true);
    });
};
