import { ResultSetHeader } from 'mysql2';
import { db } from '../../database/mySQL';
import { type Callback } from '../../types';
import { CarOffer, Equipment, InsertCarOfferParams } from './carOffers-types';

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

export const getAllCarOffers = (cb: Callback<CarOffer[]>) => {
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
        FROM CarOffers`,
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

export const insertCarOffer = (params: InsertCarOfferParams, cb: Callback<ResultSetHeader>) => {
    db.query(
        `INSERT INTO CarOffers
            (title, description, priceInCents, manufacturer, model, year, mileageInKm, fuelType, gearboxType, carType, color, numberOfDoors, numberOfSeats, taxHorsePower, horsePower, equipments, creationDateUnix, authorId)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, UNIX_TIMESTAMP(), ?)`,
        [
            params.title,
            params.description,
            params.priceInCents,
            params.manufacturer,
            params.model,
            params.year,
            params.mileageInKm,
            params.fuelType,
            params.gearboxType,
            params.carType,
            params.color,
            params.numberOfDoors,
            params.numberOfSeats,
            params.taxHorsePower,
            params.horsePower,
            params.equipments,
            params.authorId
        ],
        (error, result) => {
            if (error) {
                return cb(error);
            }

            return cb(null, result as ResultSetHeader);
        }
    );
};
