const bcrypt = require('bcrypt');
const saltRounds = 10;
const password = 'CLiEmployee';

bcrypt
    .genSalt(saltRounds)
    .then((salt) => {
        console.log('Salt: ', salt);
        return bcrypt.hash(password, salt);
    })
    .then((hash) => {
        console.log('Hash: ', hash);
    })
    .catch((err) => console.error(err.message));

/*function validateUser(hash) {
    bcrypt
        .compare(password, hash)
        .then((res) => {
            console.log(res);
        })
        .catch((err) => console.error(err.message));
}*/
