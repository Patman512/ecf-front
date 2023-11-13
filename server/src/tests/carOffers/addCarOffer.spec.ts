import { assert } from 'chai';
import { addCarOffer } from '../../modules/carOffers';

describe('addCarOffer', () => {
    it('should return true if insert was successful', () => {
        addCarOffer(
            {
                title: 'Test title',
                description: 'Test description',
                priceInCents: 42,
                manufacturer: 'Test manufacturer',
                model: 'Test model',
                year: 42,
                mileageInKm: 42,
                fuelType: 'Test fuel type',
                gearboxType: 'Test gearbox type',
                carType: 'Test car type',
                color: 'Test color',
                numberOfDoors: 42,
                numberOfSeats: 42,
                taxHorsePower: 42,
                horsePower: 42,
                equipments: 'Test equipment list',
                authorId: 1
            },
            (error, result) => {
                assert.isNull(error);
                assert.isOk(result);
            }
        );
    });

    it('should return an error if one of the values is out of range', () => {
        addCarOffer(
            {
                title: 'Test title',
                description: 'Test description',
                priceInCents: 42,
                manufacturer: 'Test manufacturer',
                model: 'Test model',
                year: 42,
                mileageInKm: 42,
                fuelType: 'Test fuel type',
                gearboxType: 'Test gearbox type',
                carType: 'Test car type',
                color: 'Test color',
                numberOfDoors: 42,
                numberOfSeats: 42,
                taxHorsePower: 4242,
                horsePower: 42,
                equipments: 'Test equipment list',
                authorId: 1
            },
            (error) => {
                assert.strictEqual(error?.message, "Out of range value for column 'taxHorsePower' at row 1");
            }
        );
    });
});
