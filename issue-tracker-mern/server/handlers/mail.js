import nodemailer from 'nodemailer';
import promisify from 'es6-promisify';
import config from '../config';

const transport = nodemailer.createTransport({
    host: config.MAIL_HOST,
    port: config.MAIL_PORT,
    auth: {
        user: config.MAIL_USER,
        pass: config.MAIL_PASS
    }
});

exports.send = async (options) => {
    const mailOptions = {
        from: 'bit-master@brightwavegroup.com',
        to: options.username,
        subject: options.subject,
        html: options.html
        // text: 'Go to the issue by selecting this link...', 
    };
    const sendMail = promisify(transport.sendMail, transport);
    return sendMail(mailOptions);
}
