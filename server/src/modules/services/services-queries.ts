import { ResultSetHeader } from 'mysql2';
import { db } from '../../database/mySQL';
import { Callback } from '../../types';
import { InsertServiceParams, Service, UpdateServiceParams } from './services-types';

export const getServices = (cb: Callback<Service[]>) => {
    db.query(
        `SELECT
            id,
            name,
            description
        FROM Services`,
        (error, results) => {
            if (error) {
                return cb(error);
            }

            return cb(null, results as Service[]);
        }
    );
};

export const insertService = (params: InsertServiceParams, cb: Callback<ResultSetHeader>) => {
    const { name, description } = params;

    db.query(`INSERT INTO Services (name, description) VALUES (?, ?)`, [name, description], (error, result) => {
        if (error) {
            return cb(error);
        }

        return cb(null, result as ResultSetHeader);
    });
};

export const updateService = (params: UpdateServiceParams, cb: Callback<ResultSetHeader>) => {
    const { id, name, description } = params;

    db.query(
        `UPDATE Services SET
            name = ?,
            description = ?
        WHERE id = ?`,
        [name, description, id],
        (error, result) => {
            if (error) {
                return cb(error);
            }

            return cb(null, result as ResultSetHeader);
        }
    );
};
