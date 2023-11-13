import { CallbackErrorOnly } from '../../types';
import { UserAccountInfo, getAccountInfoForEmail } from '../accounts';
import { ValidateAuthenticationParams } from './authentication-types';

export const validateAuthentication = (params: ValidateAuthenticationParams, cb: CallbackErrorOnly) => {
    const { requestCredentials, requiredAccountType } = params;
    const decodedCredentials = Buffer.from(requestCredentials, 'base64').toString('ascii');
    const parsedCredentials = decodedCredentials.split(':');
    const email = parsedCredentials[0];
    const requestPwdHash = parsedCredentials[1];

    return getAccountInfoForEmail(email, (error, accountInfo) => {
        if (error) {
            return cb(error);
        }

        const { pwdHash: dbPwdHash, accountType: dbAccountType } = accountInfo as UserAccountInfo;

        if (requestPwdHash !== dbPwdHash || requiredAccountType < dbAccountType) {
            return cb(new Error('Unauthorized'));
        }

        return cb();
    });
};
