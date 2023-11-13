import { NextFunction, type Request, type Response } from 'express';
import { validateAuthentication } from './modules/authentication';

const requiredAuth = {
    '/getwebapphomepagedata': null,
    '/sendemailfromcontactform': null,
    '/submitrating': null,
    '/createaccount': 1,
    '/addservice': 1,
    '/editservice': 1,
    '/removeservice': 1,
    '/editopeninghours': 1,
    '/addcaroffer': 2
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
        return res.send('Missing authorization header');
    }

    const parsedAuth = authorization.split(' ');
    const authType = parsedAuth[0];
    const credentials = parsedAuth[1];

    if (authType !== 'Basic') {
        return res.send('Invalid authentication');
    }

    validateAuthentication(
        { requestCredentials: credentials, requiredAccountType: requiredAuth[endpoint] },
        (error) => {
            if (error) {
                return res.send(error.message);
            }

            return next();
        }
    );
};
