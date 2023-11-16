import async from 'async';
import { transporter } from '../../email/nodemailer';
import { Callback, CallbackErrorOnly } from '../../types';
import { errorOnly } from '../../utils';
import { getEmployeeEmails } from '../accounts';
import { getAllCarOffers, getAvailableCarOffers, getEquipmentsList } from '../carOffers';
import { getOpeningHours } from '../openingHours';
import { InsertRatingParams, getAllRatings, getApprovedRatings, insertRating } from '../ratings';
import { getServices } from '../services';
import { HomePageData, SendEmailParams } from './webApp-types';

export const getWebAppHomePageData = (cb: Callback<HomePageData>) => {
    async.auto<HomePageData>(
        {
            carOffers: (cb) => getAvailableCarOffers(cb),
            equipmentsList: (cb) => getEquipmentsList(cb),
            ratings: (cb) => getApprovedRatings(cb),
            services: (cb) => getServices(cb),
            openingHours: (cb) => getOpeningHours(cb)
        },
        cb
    );
};

export const getBackofficeHomePageData = (cb: Callback<HomePageData>) => {
    async.auto<HomePageData>(
        {
            carOffers: (cb) => getAllCarOffers(cb),
            equipmentsList: (cb) => getEquipmentsList(cb),
            ratings: (cb) => getAllRatings(cb),
            services: (cb) => getServices(cb),
            openingHours: (cb) => getOpeningHours(cb)
        },
        cb
    );
};

export const sendEmail = (params: SendEmailParams, cb: CallbackErrorOnly) => {
    const { lastName, firstName, email, phone, message, carOfferTitle } = params;

    if (!lastName || !firstName || !email || !phone || !message) {
        return cb(new Error('Invalid input.'));
    }

    const emailTitle = carOfferTitle
        ? `Question de ${firstName} ${lastName} au sujet de "${carOfferTitle}".`
        : `Question générale de ${firstName} ${lastName}.`;
    const emailBody = `
    Nom: ${lastName}
    Prénom: ${firstName}
    Email: ${email}
    Téléphone: ${phone}
    Message: ${message}
    `;

    interface AsyncResults {
        recipientEmails: string[];
        sendEmail: void;
    }

    async.auto<AsyncResults>(
        {
            recipientEmails: (cb) => getEmployeeEmails(cb),
            sendEmail: [
                'recipientEmails',
                ({ recipientEmails }, cb) => {
                    const mailOptions = {
                        from: email,
                        to: recipientEmails.join(', '),
                        subject: emailTitle,
                        text: emailBody
                    };

                    transporter.sendMail(mailOptions, errorOnly(cb));
                }
            ]
        },
        errorOnly(cb)
    );
};

export const submitRating = (params: InsertRatingParams, cb: Callback<boolean>) => {
    const { name, rating } = params;

    if (!name) {
        return cb(new Error('Name is missing.'));
    }

    if (!rating || rating < 0 || rating > 5) {
        return cb(new Error('Invalid rating.'));
    }

    return insertRating(params, (error, result) => {
        if (error) {
            return cb(error);
        }

        return cb(null, result?.affectedRows === 1);
    });
};
