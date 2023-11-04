import async from 'async';
import { Callback } from '../../types';
import { getAvailableCarOffers, getEquipmentsList } from '../carOffers';
import { getOpeningHours } from '../openingHours';
import { getApprovedRatings } from '../ratings';
import { getServices } from '../services';
import { HomePageData } from './webApp-types';

export const getWebAppHomePageData = (cb: Callback<HomePageData>) => {
    async.auto<HomePageData>(
        {
            carOffers: (cb) => getAvailableCarOffers(cb),
            equipmentsList: (cb) => getEquipmentsList(cb),
            ratings: (cb) => getApprovedRatings(cb),
            services: (cb) => getServices(cb),
            openingHours: (cb) => getOpeningHours(cb)
        },
        cb
    );
};
