import { assert } from 'chai';
import { createUser } from '../../modules/accounts';

describe('createUser', () => {
    it('should return true if insert was successful', () => {
        createUser(
            {
                firstName: 'Bob',
                lastName: 'Marley',
                email: 'bob.marley@garagevp.fr',
                pwdHash: 'password',
                accountType: 2
            },
            (error, result) => {
                assert.isNull(error);
                assert.isOk(result);
            }
        );
    });

    it('should return an error if accountType is out of bounds', () => {
        createUser(
            {
                firstName: 'Bob',
                lastName: 'Dylan',
                email: 'bob.dylan@garagevp.fr',
                pwdHash: 'password',
                accountType: 100
            },
            (error) => {
                assert.strictEqual(error?.message, 'Invalid account type.');
            }
        );
    });

    it('should return an error if email address is already used', () => {
        createUser(
            {
                firstName: 'Bob',
                lastName: 'Marley',
                email: 'bob.marley@garagevp.fr',
                pwdHash: 'password',
                accountType: 2
            },
            (error) => {
                assert.strictEqual(error?.message, "Duplicate entry 'bob.marley@garagevp.fr' for key 'Users.email'");
            }
        );
    });
});
