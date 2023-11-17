import { ResultSetHeader } from 'mysql2';
import { db } from '../../database/mySQL';
import { Callback } from '../../types';
import { InsertUserParams, UserAccountInfo } from './accounts-types';

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

export const getAccountInfoForEmail = (email: string, cb: Callback<UserAccountInfo>) => {
    db.query(
        `SELECT id, firstName, lastName, email, pwdHash, accountType
        FROM Users
        WHERE email = ?`,
        [email],
        (error, results) => {
            if (error) {
                return cb(error);
            }

            if (!(results as UserAccountInfo[]).length) {
                return cb(new Error('User not found'));
            }

            return cb(null, results[0] as UserAccountInfo);
        }
    );
};
