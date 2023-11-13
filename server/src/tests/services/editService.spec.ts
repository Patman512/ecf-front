import { assert } from 'chai';
import { editService } from '../../modules/services';

describe('editService', () => {
    it('should return true if update was successful', () => {
        editService({ id: 5, name: 'Géométrie', description: 'Test description.' }, (error, result) => {
            assert.isNull(error);
            assert.isOk(result);
        });
    });

    it('should return false if the row to update does not exist', () => {
        editService({ id: 50, name: 'Géométrie', description: 'Test description.' }, (error, result) => {
            assert.isNull(error);
            assert.isNotOk(result);
        });
    });
});
