const checkProductAvailability = require('./src/Application/ProductAvailabilityChecker');
const setConfigData = require('./src/userDataRequester');
const notify = require('./src/Application/Notifier');
const configManager = require('./src/configManager');

const delay = 30000;

setConfigData().then(() => {
    console.log('Starting to check availability...');

    const products =  configManager.getProducts();
    const notificationData = configManager.getNotificationData();

    (function checkStockAvailability(){

        let soldOutProducts = products.filter(p => !p.available);
        if (!soldOutProducts.length) return console.log('All products are available. Script ends.');

        for(let i=0;i<soldOutProducts.length;i++){
            let product = soldOutProducts[i];
            checkProductAvailability(product).then((isAvailable) => {
                if (isAvailable) {
                    product.available = true;
                    notify(notificationData, product);
                }
            }).catch((error) => {
                console.log('Error: ', error);
            });
        }

        setTimeout(checkStockAvailability, delay);
    })();

}).catch((error) => {
    console.log('Error', error);
});

