const isProductAvailable = require('./src/productAvailability');
const setConfigData = require('./src/userDataRequester');
const notify = require('./src/notifier');
const configManager = require('./src/configManager');

    setConfigData().then(() => {
        console.log('Starting to check availability...');

        const products =  configManager.getProducts();

        let interval = setInterval(() => {

            let soldOutProducts = products.filter(p => !p.available);
            if( !soldOutProducts.length ){
                clearInterval(interval);
                return console.log('All products are available. Script ends.')
            }

            for(let i=0;i<soldOutProducts.length;i++){
                let product = soldOutProducts[i];
                let productUrl = product.url;
                isProductAvailable(productUrl).then((available) => {
                    if( available ){
                        product.available = true;
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

