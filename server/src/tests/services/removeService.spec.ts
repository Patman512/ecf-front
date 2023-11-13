import { assert } from 'chai';
import { removeService } from '../../modules/services';

describe('removeService', () => {
    it('should return true if update was successful', () => {
        removeService({ id: 5 }, (error, result) => {
            assert.isNull(error);
            assert.isOk(result);
        });
    });

    it('should return false if the row to delete does not exist', () => {
        removeService({ id: 50 }, (error, result) => {
            assert.isNull(error);
            assert.isNotOk(result);
        });
    });
});
