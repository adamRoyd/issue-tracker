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

let mailOptions = {
    from: '"Fred Foo 👻" <foo@blurdybloop.com>', // sender address
    to: 'bar@blurdybloop.com, baz@blurdybloop.com', // list of receivers
    subject: 'Hello ✔', // Subject line
    text: 'Hello world ?', // plain text body
    html: '<b>Hello world ?</b>' // html body
};

exports.send = async (options) => {
    const mailOptions = {
        from: 'bit-master@brightwavegroup.com',
        to: options.username,
        subject: options.subject,
        text: 'Hello world ?', 
        html: '<p>Go to the issue by selecting this link..</p>'
    };
    const sendMail = promisify(transport.sendMail, transport);
    return sendMail(mailOptions);
}



// send mail with defined transport object
// transport.sendMail(mailOptions, (error, info) => {
//     if (error) {
//         return console.log(error);
//     }
//     console.log('Message %s sent: %s', info.messageId, info.response);
// });