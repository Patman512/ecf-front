import { Callback, CallbackErrorOnly } from './types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const errorOnly = (cb: CallbackErrorOnly): Callback<any> => {
    return (error?: Error | null) => cb(error as Error);
};
