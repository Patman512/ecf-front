import { makeRequestAPI } from '../libs/api';
import { CallbackErrorOnly } from '../libs/types';
import { errorOnly } from '../libs/utils';
import { AddServiceParams, DeleteServiceParams, UpdateServiceParams } from './types';

export const addService = (params: AddServiceParams, cb: CallbackErrorOnly) => {
    makeRequestAPI({ endpoint: 'addservice', data: params }, errorOnly(cb));
};

export const updateService = (params: UpdateServiceParams, cb: CallbackErrorOnly) => {
    makeRequestAPI({ endpoint: 'editservice', data: params }, errorOnly(cb));
};

export const deleteService = (params: DeleteServiceParams, cb: CallbackErrorOnly) => {
    makeRequestAPI({ endpoint: 'removeservice', data: params }, errorOnly(cb));
};
