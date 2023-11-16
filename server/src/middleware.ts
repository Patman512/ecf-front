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
    '/uploadfiles': AccountType.Employee
};

export const middleware = (req: Request, res: Response, next: NextFunction) => {
    const {
        url: endpoint,
        headers: { authorization }
    } = req;

    if (requiredAuth[endpoint] === null) {
        return next();
    }

    if (!authorization) {
        return res.status(400).send('Missing authorization header');
    }

    const parsedAuth = authorization.split(' ');
    const authType = parsedAuth[0];
    const credentials = parsedAuth[1];

    if (authType !== 'Basic') {
        return res.status(400).send('Invalid authentication');
    }

    return validateAuthentication(
        { requestCredentials: credentials, requiredAccountType: requiredAuth[endpoint] },
        (error) => {
            if (error) {
                return res.status(403).send(error.message);
            }

            return next();
        }
    );
};
