import { CarOffer, Equipment } from '../carOffers';
import { OpeningHour } from '../openingHours';
import { Rating } from '../ratings';
import { Service } from '../services';

export interface HomePageData {
    carOffers: CarOffer[];
    equipmentsList: Equipment[];
    ratings: Rating[];
    services: Service[];
    openingHours: OpeningHour[];
}

export interface SendEmailParams {
    lastname: string;
    firstname: string;
    email: string;
    phone: number;
    message: string;
    carOfferTitle?: string;
}
