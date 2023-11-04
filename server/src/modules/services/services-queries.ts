import { db } from '../../database/mySQL';
import { Callback } from '../../types';
import { Service } from './services-types';

export const getServices = (cb: Callback<Service[]>) => {
    db.query(
        `SELECT
            id,
            name,
            description
        FROM Services`,
        (error, results) => {
            if (error) {
                return cb(error);
            }

            return cb(null, results as Service[]);
        }
    );
};
