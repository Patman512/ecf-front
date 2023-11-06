import { Callback } from '../../types';
import { insertUser } from './accounts-queries';
import { InsertUserParams } from './accounts-types';

export const createUser = (params: InsertUserParams, cb: Callback<boolean>) => {
    const { firstName, lastName, email, pwdHash, accountType } = params;

    if (!firstName || !lastName || !email || !pwdHash || !accountType) {
        return cb(new Error('Invalid input.'));
    }

    if (accountType < 1 || accountType > 2) {
        return cb(new Error('Invalid account type.'));
    }

    return insertUser(params, (error, result) => {
        if (error) {
            return cb(error);
        }

        return cb(null, result?.affectedRows === 1);
    });
};
