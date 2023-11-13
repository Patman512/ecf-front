import { assert } from 'chai';
import { editService } from '../../modules/services';

describe('editService', () => {
    it('should return true if update was successful', () => {
        editService({ id: 5, name: 'Géométrie', description: 'Test description.' }, (error, result) => {
            assert.isNull(error);
            assert.isOk(result);
        });
    });
});
