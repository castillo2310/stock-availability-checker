const isProductAvailable = require('./src/productAvailability');
const setConfigData = require('./src/userDataRequester');
const notify = require('./src/notifier');
const configManager = require('./src/configManager');

    setConfigData().then(() => {
        console.log('Starting to check availability...');

        let interval = setInterval(() => {

            let soldOutProducts =  configManager.getSoldOutProductsUrl();
            if( !soldOutProducts.length ){
                clearInterval(interval);
                return console.log('All products are available. Script ends.')
            }

            for(let i=0;i<soldOutProducts.length;i++){
                let productUrl = soldOutProducts[i];
                isProductAvailable(productUrl).then((available) => {
                    if( available ){
                        configManager.setProductAvailable(productUrl).then(() => {
                            notify(configManager.getNotificationData(), productUrl);
                        });
                    }
                }).catch((error) => {
                    console.log('Error: ', error);
                });
            }

        }, 30000);
    }).catch((error) => {
        console.log('Error', error);
    });

