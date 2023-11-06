import async from 'async';
import { transporter } from '../../email/nodemailer';
import { Callback, CallbackErrorOnly } from '../../types';
import { errorOnly } from '../../utils';
import { getEmployeeEmails } from '../accounts';
import { getAvailableCarOffers, getEquipmentsList } from '../carOffers';
import { getOpeningHours } from '../openingHours';
import { getApprovedRatings, insertRating } from '../ratings';
import { getServices } from '../services';
import { HomePageData, SendEmailParams, SubmitRatingParams } from './webApp-types';

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

export const sendEmail = (params: SendEmailParams, cb: CallbackErrorOnly) => {
    const { lastname, firstname, email, phone, message, carOfferTitle } = params;

    if (!lastname || !firstname || !email || !phone || !message) {
        return cb(new Error('Invalid input.'));
    }

    const emailTitle = carOfferTitle
        ? `Question de ${firstname} ${lastname} au sujet de "${carOfferTitle}".`
        : `Question générale de ${firstname} ${lastname}.`;
    const emailBody = `
    Nom: ${lastname}
    Prénom: ${firstname}
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

export const submitRating = (params: SubmitRatingParams, cb: Callback<boolean>) => {
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
