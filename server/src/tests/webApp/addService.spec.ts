import { assert } from 'chai';
import { addService } from '../../modules/services';

describe('addService', () => {
    it('should return true if insert was successful', () => {
        addService({ name: 'Vente de pièces détachées', description: 'Test description.' }, (error, result) => {
            assert.isNull(error);
            assert.isOk(result);
        });
    });

    it('should return true even if no description was provided', () => {
        addService({ name: 'Service test' }, (error, result) => {
            assert.isNull(error);
            assert.isOk(result);
        });
    });

    it('should return an error if the service already exists', () => {
        addService({ name: 'Vente de pièces détachées' }, (error) => {
            assert.strictEqual(error?.message, "Duplicate entry 'Vente de pièces détachées' for key 'Services.name'");
        });
    });
});
