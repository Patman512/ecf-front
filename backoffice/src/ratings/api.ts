import { makeRequestAPI } from '../libs/api';
import { CallbackErrorOnly } from '../libs/types';
import { errorOnly } from '../libs/utils';
import { AddRatingParams } from './types';

export const addRating = (params: AddRatingParams, cb: CallbackErrorOnly) => {
    makeRequestAPI({ endpoint: 'submitrating', data: params }, errorOnly(cb));
};
