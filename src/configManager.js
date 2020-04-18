const fs = require('fs');
const path = require('path');

const configFile = path.join(__dirname,'../config.json');

const read = () => {
    if( !fs.existsSync(configFile) ) return {};

    try{
        return JSON.parse(fs.readFileSync(configFile));
    }catch (e) {
        console.log('Error reading config file: ', e);
        return {};
    }
};

const getNotificationData = () => {
    const data = read();
    return data.notification;
};

const getSoldOutProductsUrl = () => {
    const soldOutProductsUrl = [];

    const data = read();
    if( !data.products ) return [];

    for (let i=0;i<data.products.length;i++) {
        let product = data.products[i];
        if( !product.available ) soldOutProductsUrl.push(product.url);
    }
    return soldOutProductsUrl;
};

const saveFromUserRequest = async (data) => {
    let parsedData = {
        notification: data.notification,
        products: []
    };

    for (let i=0;i<data.productUrl.length;i++) {
        parsedData.products.push({
           url: data.productUrl[i],
           available: false
        });
    }

    return save(parsedData);
};

const setProductAvailable = async (productUrl) => {
    let data = read();
    let productFound = false;
    let i = 0;

    while (i < data.products.length && !productFound ){
        if ( data.products[i].url === productUrl ){
            data.products[i].available = true;
            productFound = true;
        }
        i++;
    }

    return save(data);
};

const save = async (data) => {
    return new Promise((resolve, reject) => {
        try{
            fs.writeFile(configFile, JSON.stringify(data), (error) => {
               if (error) reject(error);
               resolve();
            });
        }catch (e) {
            console.log('Error saving config file: ', e);
            reject(e);
        }
    });
};

module.exports = {
    saveFromUserRequest: saveFromUserRequest,
    getSoldOutProductsUrl: getSoldOutProductsUrl,
    getNotificationData: getNotificationData,
    setProductAvailable: setProductAvailable
};
