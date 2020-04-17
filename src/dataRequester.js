const prompts = require('prompts');

/**
 * Request required user data.
 * Keeps asking for product url until the user enters empty value
 * @returns {Promise<{productUrl: []}>}
 */
const requestUserData = async () => {
    const userData = {productUrl: []};
    let keepAsking = true;
    while( keepAsking ){

        let productUrl = await askForProductUrl();
        if( productUrl !== '' ){
            userData.productUrl.push(productUrl);
        }else keepAsking = false;

    }

    return userData;
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
