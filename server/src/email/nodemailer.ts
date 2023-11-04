import * as nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'gvpmessagerie@gmail.com',
        pass: 'uixr kwdc kqoj tvij'
    }
});
