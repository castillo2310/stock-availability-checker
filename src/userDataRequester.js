const prompts = require('prompts');

/**
 * Request required user data.
 * Keeps asking for product url until the user enters empty value
 * @returns {Promise<{productUrl: []}>}
 */
const requestUserData = async () => {
    const userData = {productUrl: [], notification:{}};
    let keepAsking = true;
    while( keepAsking ){

        let productUrl = await askForProductUrl();
        if( productUrl !== '' ){
            userData.productUrl.push(productUrl);
        }else keepAsking = false;

    }

    userData.notification.email = await askForEmailData();

    return userData;
};

const askForEmailData = async () => {
    const questions = [
        {
            name: 'smtp',
            type: 'text',
            message: 'Enter SMTP host'
        },
        {
            name: 'port',
            type: 'number',
            message: 'Enter SMTP port'
        },
        {
            name: 'user',
            type: 'text',
            message: 'Enter SMTP user'
        },
        {
            name: 'password',
            type: 'password',
            message: 'Enter SMTP password'
        }
    ];
    const onCancel = () => process.exit();

    return await prompts(questions, {onCancel});
};

const askForProductUrl = async () => {
    const questions = [
        {
            name: 'productUrl',
            type: 'text',
            message: 'Enter product URL (empty value to finish)'
        }
    ];
    const onCancel = () => process.exit();

    const answer = await prompts(questions, {onCancel});
    return answer.productUrl;
};

module.exports = requestUserData;
