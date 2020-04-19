const prompts = require('prompts');
const configManager = require('./configManager');


const setConfigData = async() => {
    if( !configManager.configFileExists() ) await requestUserData();
    else console.log('Configuration file found');
};

/**
 * Request required user data.
 * Keeps asking for product url until the user enters empty value
 * Saves requested data to config file
 */
const requestUserData = async () => {
    const userData = {productUrl: [], notification:{}};
    let keepAsking = true;
    while( keepAsking ){

        let productUrl = await askForProductUrl();

        if (productUrl !== '') userData.productUrl.push(productUrl);
        else if (!userData.productUrl.length) console.log('At least one product url is required');
        else keepAsking = false;
    }

    userData.notification = await askForNotificationData();
    await configManager.saveFromUserRequest(userData);
};

const askForNotificationData = async () => {
    const notification = {};

    const questions = [
        {
            name: 'notificationType',
            type: 'select',
            message: 'Which notification method do you prefer?',
            choices: [
                { title: 'None', description: 'Only through console', value: 'none' },
                { title: 'Email', description: 'SMTP data required', value: 'email' }
            ],
            initial: 0
        }
    ];

    const onCancel = () => process.exit();
    const answer = await prompts(questions, {onCancel});

    if( answer.notificationType === 'email' ) notification.email = await askForEmailData();
    return notification;
};

const askForEmailData = async () => {
    const questions = [
        {
            name: 'smtp',
            type: 'text',
            message: 'Enter SMTP host',
            validate: emptyValidation
        },
        {
            name: 'port',
            type: 'number',
            message: 'Enter SMTP port',
            validate: emptyValidation
        },
        {
            name: 'user',
            type: 'text',
            message: 'Enter SMTP user',
            validate: emptyValidation
        },
        {
            name: 'password',
            type: 'password',
            message: 'Enter SMTP password',
            validate: emptyValidation
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

const emptyValidation = (value) => {
    return value === '' ? 'Value must not be empty' : true;
};

module.exports = setConfigData;
