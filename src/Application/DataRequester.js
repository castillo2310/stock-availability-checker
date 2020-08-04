const prompts = require('prompts');
const fs = require('fs');
const path = require('path');
const jsonfile = require('jsonfile');
const Product = require('../Domain/Product');

const configFile = path.join(__dirname,'../../config.json');

const handler = async () => {
    if (!configFileExists()) {
        const userData = await requestUserData();
        saveConfig(userData);
    }

    const data = getConfig();

    return {
        notification: data.notification,
        products: getProducts(data.productUrlList)
    };
};

const configFileExists = () => {
    return fs.existsSync(configFile);
};

const getConfig = () => {
    return jsonfile.readFileSync(configFile);
};

const saveConfig = (config) => {
    return jsonfile.writeFileSync(configFile, config);
};

const getProducts = (productUrlList) => {
    const products = [];
    for (let i=0;i<productUrlList.length;i++) {
        const product = Product.create(productUrlList[i]);
        products.push(product);
    }

    return products;
};


const requestUserData = async () => {
    const userData = {productUrlList: [], notification:{}};
    let keepAsking = true;
    while( keepAsking ){

        let productUrl = await askForProductUrl();

        if (productUrl !== '') userData.productUrlList.push(productUrl);
        else if (!userData.productUrlList.length) console.log('At least one product url is required');
        else keepAsking = false;
    }

    userData.notification = await askForNotificationData();
    return userData;
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

module.exports = handler;
