import * as mysql from 'mysql2';

export const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'admin',
    database: 'db',
    port: 13305
});

console.log('Connection created: ', db);
