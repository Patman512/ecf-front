import { type Request, type Response } from 'express';

/* const runMiddleware = (
    initialRequest: ProcessingRequest,
    steps: Array<{ name: string; step: Middleware }>,
    apmParentSpan: apm.Span,
    cb: (error: HTTPError | null, result: RunMiddlewareResult) => void
) => {}; */

export const middleware = (req: Request, res: Response, next: () => void): Response => {
    return res.send('ET BIM');
};
