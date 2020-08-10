const sgMail = require('@sendgrid/mail');
const config = require('../config/config')
sgMail.setApiKey(config.sendGridApiKey);

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'todorov.stanimir0803@gmail.com',
        subject: 'Thanks for joining in!',
        text: `Welcome to the app ${name}. Let me know how You get along with the app.`
    });
};

const sendCancelationEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'todorov.stanimir0803@gmail.com',
        subject: 'Sorry to see you go!',
        text: `Good buy, ${name}. I hope to see you back sometime soon.`
    });
};

module.exports = {
    sendWelcomeEmail,
    sendCancelationEmail
};
