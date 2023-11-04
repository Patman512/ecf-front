import { assert } from 'chai';
import { CarOffer, Equipment } from '../../modules/carOffers';
import { Rating } from '../../modules/ratings';
import { Service } from '../../modules/services';
import { getWebAppHomePageData } from '../../modules/webApp';

const homePageDataKeys = ['carOffers', 'equipmentsList', 'ratings', 'services', 'openingHours'];

describe('getWebAppHomePageData', () => {
    it('should return all the expected data properties', () => {
        getWebAppHomePageData((error, homePageData) => {
            assert.isNull(error);
            assert.hasAllKeys(homePageData, homePageDataKeys);
        });
    });

    it('should return the expected number of car offers', () => {
        getWebAppHomePageData((error, homePageData) => {
            assert.isNull(error);
            assert.lengthOf(homePageData?.carOffers as CarOffer[], 4);
        });
    });

    it('should return the expected number of equipments', () => {
        getWebAppHomePageData((error, homePageData) => {
            assert.isNull(error);
            assert.lengthOf(homePageData?.equipmentsList as Equipment[], 25);
        });
    });

    it('should return the expected number of approved ratings', () => {
        getWebAppHomePageData((error, homePageData) => {
            assert.isNull(error);
            assert.lengthOf(homePageData?.ratings as Rating[], 2);
        });
    });

    it('should return the expected number of services', () => {
        getWebAppHomePageData((error, homePageData) => {
            assert.isNull(error);
            assert.lengthOf(homePageData?.services as Service[], 6);
        });
    });

    it('should return the opening hours for the whole week', () => {
        getWebAppHomePageData((error, homePageData) => {
            assert.isNull(error);
            assert.deepNestedInclude(homePageData, { 'openingHours[0].dayOfWeek': 'Lundi' });
            assert.deepNestedInclude(homePageData, { 'openingHours[1].dayOfWeek': 'Mardi' });
            assert.deepNestedInclude(homePageData, { 'openingHours[2].dayOfWeek': 'Mercredi' });
            assert.deepNestedInclude(homePageData, { 'openingHours[3].dayOfWeek': 'Jeudi' });
            assert.deepNestedInclude(homePageData, { 'openingHours[4].dayOfWeek': 'Vendredi' });
            assert.deepNestedInclude(homePageData, { 'openingHours[5].dayOfWeek': 'Samedi' });
            assert.deepNestedInclude(homePageData, { 'openingHours[6].dayOfWeek': 'Dimanche' });
        });
    });
});
