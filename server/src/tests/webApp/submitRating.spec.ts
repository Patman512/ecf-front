import { assert } from 'chai';
import { submitRating } from '../../modules/webApp';

describe('submitRating', () => {
    it('should return true if insert was successful', () => {
        submitRating({ name: 'Bob', comment: 'Test comment.', rating: 5 }, (error, result) => {
            assert.isNull(error);
            assert.isOk(result);
        });
    });

    it('should return an error if rating is out of bounds', () => {
        submitRating({ name: 'Bob', comment: 'Test comment.', rating: 100 }, (error) => {
            assert.strictEqual(error?.message, 'Invalid rating.');
        });
    });
});
