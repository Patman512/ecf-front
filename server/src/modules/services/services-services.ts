import { QueryError } from 'mysql2';
import { Callback } from '../../types';
import { insertService } from './services-queries';
import { InsertServiceParams } from './services-types';

export const addService = (params: InsertServiceParams, cb: Callback<boolean>) => {
    const { name } = params;

    if (!name) {
        return cb(new Error('Invalid input.'));
    }

    return insertService(params, (error, result) => {
        if (error) {
            return cb(error);
        }

        return cb(null, result?.affectedRows === 1);
    });
};
