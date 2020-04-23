const checkAvailability = require('./src/Application/ProductAvailabilityChecker');
const setConfigData = require('./src/userDataRequester');
const notify = require('./src/Application/Notifier');
const configManager = require('./src/configManager');

    setConfigData().then(() => {
        console.log('Starting to check availability...');

        const products =  configManager.getProducts();
        const notificationData = configManager.getNotificationData();
        let interval = setInterval(() => {

            let soldOutProducts = products.filter(p => !p.available);
            if( !soldOutProducts.length ){
                clearInterval(interval);
                return console.log('All products are available. Script ends.')
            }

            for(let i=0;i<soldOutProducts.length;i++){
                let product = soldOutProducts[i];
                checkAvailability(product).then((isAvailable) => {
                    if (isAvailable) {
                        product.available = true;
                        notify(notificationData, product);
                    }
                }).catch((error) => {
                    console.log('Error: ', error);
                });
            }

        }, 30000);
    }).catch((error) => {
        console.log('Error', error);
    });

