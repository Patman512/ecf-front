import { ResultSetHeader } from 'mysql2';
import { db } from '../../database/mySQL';
import { Callback } from '../../types';
import { InsertUserParams } from './accounts-types';

export const getEmployeeEmails = (cb: Callback<string[]>) => {
    const employeeAccountTypes = ['Administrator', 'Employee'];

    db.query(
        `SELECT Users.email as email
        FROM Users
        JOIN AccountTypes ON Users.accountType = AccountTypes.id
        WHERE AccountTypes.name IN (?)`,
        [employeeAccountTypes],
        (error, results) => {
            if (error) {
                return cb(error);
            }

            const employeeEmails = (results as { email: string }[]).map((result) => result.email);

            return cb(null, employeeEmails);
        }
    );
};

export const insertUser = (params: InsertUserParams, cb: Callback<ResultSetHeader>) => {
    const { firstName, lastName, email, pwdHash, accountType } = params;

    db.query(
        `INSERT INTO Users (firstName, lastName, email, pwdHash, accountType) VALUES (?, ?, ?, ?, ?)`,
        [firstName, lastName, email, pwdHash, accountType],
        (error, result) => {
            if (error) {
                return cb(error);
            }

            return cb(null, result as ResultSetHeader);
        }
    );
};
