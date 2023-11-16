import * as superagent from 'superagent';

interface MakeRequestAPIParams {
    endpoint: string;
    data: any;
}

export function makeRequestAPI<ResponseType>(
    params: MakeRequestAPIParams,
    cb: (error?: Error | null, response?: ResponseType) => void
): void {
    const { endpoint, data } = params;

    superagent
        .post(`/${endpoint}`)
        .type('application/json')
        .set('Accept', 'application/json')
        .send(data)
        .end((error: Error, response: superagent.Response): void => {
            if (error) {
                if ((error as any).status === 401) {
                    location.reload();
                    return;
                }
                if (!response?.body) {
                    return cb(error);
                }
            }

            const data = response.body;

            if (response.status < 200 || response.status >= 300) {
                return cb(data);
            }

            return cb(null, data as ResponseType);
        });
}
