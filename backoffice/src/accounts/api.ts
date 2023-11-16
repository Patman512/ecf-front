import { makeRequestAPI } from '../libs/api';
import { CallbackErrorOnly } from '../libs/types';
import { errorOnly } from '../libs/utils';
import { AddUserParams } from './types';

export const addUser = (params: AddUserParams, cb: CallbackErrorOnly) => {
    makeRequestAPI({ endpoint: 'createaccount', data: params }, errorOnly(cb));
};
