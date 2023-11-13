import { Callback } from '../../types';
import { insertService, updateService } from './services-queries';
import { InsertServiceParams, UpdateServiceParams } from './services-types';

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

export const editService = (params: UpdateServiceParams, cb: Callback<boolean>) => {
    const { id, name, description } = params;

    if (!id || !name || !description) {
        return cb(new Error('Invalid input.'));
    }

    return updateService(params, (error, result) => {
        if (error) {
            return cb(error);
        }

        return cb(null, result?.affectedRows === 1);
    });
};
