import nodemailer from 'nodemailer';
import promisify from 'es6-promisify';
import config from '../config';

const transport = nodemailer.createTransport({
    // host: 'smtp.mailtrap.io',
    // port: 2525,
    // auth: {
    //     user: 'b1cfc87c633479',
    //     pass: 'e4a9c028b9c5cc',
    // },
    service: 'gmail',
    auth: {
        user: 'adamboothroyd1@gmail.com',
        pass: 'IsC,ItH4'
    }
});

exports.send = async (options) => {
    console.log('sending mail...');
    const mailOptions = {
        from: 'bit-master@brightwavegroup.com',
        to: options.username,
        subject: options.subject,
        html: options.html,
    };
    const sendMail = promisify(transport.sendMail, transport);
    return sendMail(mailOptions);
}
