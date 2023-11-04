import { db } from '../../database/mySQL';
import { Callback } from '../../types';

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
