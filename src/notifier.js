const sendMail = require('./email');

/**
 *
 * @param data
 * @param url
 */
const notify = (data, url) => {
    console.log('Product '+url+' is available.');

    if( Object.keys(data.email).length ) sendMail(data.email.smtp, data.email.port, data.email.user, data.email.password, url);
};

module.exports = notify;
