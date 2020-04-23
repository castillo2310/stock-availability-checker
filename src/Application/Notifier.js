const notifyByEmail = require('../Infrastructure/Notifier_Email');

const notify = async (data, product) => {

    console.log(`Product ${product.url} is available`);

    if (data.email) notifyByEmail(data.email, product).catch((error) => console.log('Error notifyByEmail: ', error));

};

module.exports = notify;
