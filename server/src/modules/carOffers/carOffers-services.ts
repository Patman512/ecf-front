import { Callback } from '../../types';
import { insertCarOffer } from './carOffers-queries';
import { InsertCarOfferParams } from './carOffers-types';

export const addCarOffer = (params: InsertCarOfferParams, cb: Callback<number>) => {
    if (
        !params.title ||
        !params.priceInCents ||
        !params.manufacturer ||
        !params.model ||
        !params.year ||
        !params.mileageInKm ||
        !params.fuelType ||
        !params.gearboxType ||
        !params.carType ||
        !params.color ||
        !params.numberOfDoors ||
        !params.numberOfSeats ||
        !params.taxHorsePower ||
        !params.horsePower ||
        !params.authorId
    ) {
        return cb(new Error('Invalid input.'));
    }

    return insertCarOffer(params, (error, result) => {
        if (error) {
            return cb(error);
        }

        return cb(null, result?.insertId);
    });
};
