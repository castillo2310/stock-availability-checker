const sendMail = require('./email');

/**
 * Notifies the user with the chosen method
 * @param data
 * @param url
 */
const notify = (data, url) => {
    console.log('Product '+url+' is available.');

    if( mustNotifyByEmail(data) ) sendMail(data.email.smtp, data.email.port, data.email.user, data.email.password, url);
};

const mustNotifyByEmail = (data) => {
    return data.email && Object.keys(data.email).length;
};

module.exports = notify;
