import nodemailer from 'nodemailer';
import promisify from 'es6-promisify';
import pug from 'pug';
import juice from 'juice';
import htmlToText from 'html-to-text';
import config from '../config';

const transport = nodemailer.createTransport({

});

const generateHTML = (filename, options = {}) => {
    const html = pug.renderFile(`${__dirname}/../email/${filename}.pug`, options);
    const inlined = juice(html);
    return inlined;
}

exports.send = async (options) => {
    console.log('sending mail...');
    const html = generateHTML(options.filename, options);
    const text = htmlToText.fromString(html);

    const mailOptions = {
        from: 'bit-master@brightwavegroup.com',
        to: options.username,
        subject: options.subject,
        html,
        text
    };
    const sendMail = promisify(transport.sendMail, transport);
    return sendMail(mailOptions);
}
