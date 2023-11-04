import { NextFunction, type Request, type Response } from 'express';

export const middleware = (req: Request, res: Response, next: NextFunction): void => {
    // do authentication?
};
