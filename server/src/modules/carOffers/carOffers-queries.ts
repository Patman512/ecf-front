import { db } from '../../database/mySQL';
import { type Callback } from '../../types';
import { CarOffer, Equipment } from './carOffers-types';

export const getAvailableCarOffers = (cb: Callback<CarOffer[]>) => {
    db.query(
        `SELECT
            id,
            title,
            description,
            priceInCents,
            manufacturer,
            model,
            year,
            mileageInKm,
            fuelType,
            gearboxType,
            carType,
            color,
            numberOfDoors,
            numberOfSeats,
            taxHorsePower,
            horsePower,
            equipments,
            creationDateUnix,
            authorId,
            sold
        FROM CarOffers
        WHERE sold = 0`,
        (error, results) => {
            if (error) {
                return cb(error);
            }

            return cb(null, results as CarOffer[]);
        }
    );
};

export const getEquipmentsList = (cb: Callback<Equipment[]>) => {
    db.query(
        `SELECT id, name
        FROM Equipments`,
        (error, results) => {
            if (error) {
                return cb(error);
            }

            return cb(null, results as Equipment[]);
        }
    );
};
