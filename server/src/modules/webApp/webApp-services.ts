import async from 'async';
import { transporter } from '../../email/nodemailer';
import { Callback, CallbackErrorOnly } from '../../types';
import { errorOnly } from '../../utils';
import { getEmployeeEmails } from '../accounts';
import { getAvailableCarOffers, getEquipmentsList } from '../carOffers';
import { getOpeningHours } from '../openingHours';
import { getApprovedRatings } from '../ratings';
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

export const sendEmail = (params: SendEmailParams, cb: CallbackErrorOnly) => {
    const { lastname, firstname, email, phone, message, carOfferTitle } = params;
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
