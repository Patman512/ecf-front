export type CallbackErrorOnly = (error?: Error) => void;

export type Callback<T> = (error?: Error | null, results?: T) => void;
