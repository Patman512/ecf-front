import { assert } from 'chai';
import { editOpeningHours } from '../../modules/openingHours';

describe('editOpeningHours', () => {
    it('should return true if update was successful', () => {
        editOpeningHours(
            {
                openingHours: [
                    {
                        id: 1,
                        dayOfWeek: 'Lundi',
                        openingTime: '8:00',
                        closingTime: '19:00',
                        breakStartTime: '12:00',
                        breakEndTime: '14:00'
                    }
                ]
            },
            (error, result) => {
                assert.isNull(error);
                assert.isOk(result);
            }
        );
    });

    it('should return false if one of the updates failed because the provided id does not exist', () => {
        editOpeningHours(
            {
                openingHours: [
                    {
                        id: 1,
                        dayOfWeek: 'Lundi',
                        openingTime: '9:00',
                        closingTime: '19:00',
                        breakStartTime: '12:00',
                        breakEndTime: '14:00'
                    },
                    {
                        id: 50,
                        dayOfWeek: 'Mardi',
                        openingTime: '9:00',
                        closingTime: '19:00',
                        breakStartTime: '12:00',
                        breakEndTime: '14:00'
                    }
                ]
            },
            (error, result) => {
                assert.isNull(error);
                assert.isNotOk(result);
            }
        );
    });

    it('should return false if id does not match dayOfWeek', () => {
        editOpeningHours(
            {
                openingHours: [
                    {
                        id: 1,
                        dayOfWeek: 'Mardi',
                        openingTime: '9:00',
                        closingTime: '19:00',
                        breakStartTime: '12:00',
                        breakEndTime: '14:00'
                    }
                ]
            },
            (error, result) => {
                assert.isNull(error);
                assert.isNotOk(result);
            }
        );
    });
});
