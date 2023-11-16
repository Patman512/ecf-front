import { makeRequestAPI } from '../libs/api';
import { CallbackErrorOnly } from '../libs/types';
import { errorOnly } from '../libs/utils';
import { EditOpeningHoursParams } from './types';

export const editOpeningHours = (params: EditOpeningHoursParams, cb: CallbackErrorOnly) => {
    makeRequestAPI({ endpoint: 'editopeninghours', data: params }, errorOnly(cb));
};
