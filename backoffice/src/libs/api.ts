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
    let authorizationHeader = 'Basic ';
    const tokenStr = localStorage.getItem('token');

    if (tokenStr) {
        const token = JSON.parse(tokenStr);
        const expiry = token.expiry;
        const now = new Date();
        const userCredentials = expiry < now.getTime() ? 'expired' : token.value;
        authorizationHeader += userCredentials;
    } else {
        authorizationHeader += 'tokenNotFound';
    }

    superagent
        .post(`https://64.226.72.248/${endpoint}`)
        .type('application/json')
        .set('mode', 'cors')
        .set('Accept', 'application/json')
        .set('Authorization', authorizationHeader)
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
