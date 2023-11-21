import { NextFunction, type Request, type Response } from 'express';
import { validateAuthentication } from './modules/authentication';

enum AccountType {
    Administrator = 1,
    Employee = 2
}

const requiredAuth = {
    '/getwebapphomepagedata': null,
    '/getbackofficehomepagedata': AccountType.Employee,
    '/sendemailfromcontactform': null,
    '/submitrating': null,
    '/approverating': AccountType.Employee,
    '/createaccount': AccountType.Administrator,
    '/addservice': AccountType.Administrator,
    '/editservice': AccountType.Administrator,
    '/removeservice': AccountType.Administrator,
    '/editopeninghours': AccountType.Administrator,
    '/addcaroffer': AccountType.Employee,
    '/uploadfiles': AccountType.Employee,
    '/.well-known/pki-validation/1EA63F0AADA2A7A1FF9717DF7D4C3D12.txt': null
};

export const middleware = (req: Request, res: Response, next: NextFunction) => {
    const {
        url: endpoint,
        headers: { authorization }
    } = req;

    console.log(`Request to ${endpoint}...`);

    if (requiredAuth[endpoint] === null) {
        return next();
    }

    console.log('Authenticating...');

    if (!authorization) {
        console.error('ERROR: No authorization header.');
        return res.status(400).send('Missing authorization header');
    }

    const parsedAuth = authorization.split(' ');
    const authType = parsedAuth[0];
    const credentials = parsedAuth[1];

    if (authType !== 'Basic') {
        console.error('ERROR: Wrong authentication type.');
        return res.status(400).send('Invalid authentication');
    }

    console.log('Verifying credentials...');

    return validateAuthentication(
        { requestCredentials: credentials, requiredAccountType: requiredAuth[endpoint] },
        (error, authorId) => {
            if (error) {
                console.error('Authentication failed: ', error.message);
                return res.status(403).send(error.message);
            }

            console.log('Authentication succeeded.');
            res.locals.authorId = authorId;

            return next();
        }
    );
};
