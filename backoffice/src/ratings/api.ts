import { makeRequestAPI } from '../libs/api';
import { CallbackErrorOnly } from '../libs/types';
import { errorOnly } from '../libs/utils';
import { AddRatingParams, ApproveRatingParams } from './types';

export const addRating = (params: AddRatingParams, cb: CallbackErrorOnly) => {
    makeRequestAPI({ endpoint: 'submitrating', data: params }, errorOnly(cb));
};

export const approveRating = (params: ApproveRatingParams, cb: CallbackErrorOnly) => {
    makeRequestAPI({ endpoint: 'approverating', data: params }, errorOnly(cb));
};
