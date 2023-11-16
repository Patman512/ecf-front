import { makeRequestAPI } from '../libs/api';
import { Callback } from '../libs/types';
import { HomePageData } from './types';

export const getHomePageData = (cb: Callback<HomePageData>) => {
    makeRequestAPI({ endpoint: 'getbackofficehomepagedata', data: {} }, cb);
};
