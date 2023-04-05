import nodemailer from 'nodemailer';
import config from '../config/config.js';

export const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: config.mailer.GMAIL_USER,
        pass: config.mailer.GMAIL_PWD
    }
});