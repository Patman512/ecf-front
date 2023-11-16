import { makeRequestAPI } from '../libs/api';
import { Callback, CallbackErrorOnly } from '../libs/types';
import { errorOnly } from '../libs/utils';
import { AddCarOfferParams, UploadFilesParams } from './types';

export const addCarOffer = (params: AddCarOfferParams, cb: Callback<number>) => {
    makeRequestAPI({ endpoint: 'addcaroffer', data: params }, cb);
};

export const uploadFiles = (params: UploadFilesParams, cb: CallbackErrorOnly) => {
    makeRequestAPI({ endpoint: 'addcaroffer', data: params }, errorOnly(cb));
};
