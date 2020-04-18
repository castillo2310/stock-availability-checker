
const getProductId = require('./src/urlParser');
const isProductAvailable = require('./src/productAvailability');
const requestUserData = require('./src/userDataRequester');
const notify = require('./src/notifier');
const configManager = require('./src/configManager');

try {

    requestUserData().then(() => {
        console.log('Starting to check availability...');

        let interval = setInterval(() => {

            let soldOutProducts =  configManager.getSoldOutProductsUrl();
            if( !soldOutProducts.length ){
                clearInterval(interval);
                return console.log('All products are available. Script ends.')
            }

            console.log('Checking products');
            for(let i=0;i<soldOutProducts.length;i++){
                try {
                    let productUrl = soldOutProducts[i];
                    let productId = getProductId(soldOutProducts[i]);
                    if (!productId) throw new Error('ProductId not found.');

                    const stockUrl = 'https://www.elcorteingles.es/api/stock?products=' + productId;
                    isProductAvailable(stockUrl).then((available) => {
                        if( available ){
                            configManager.setProductAvailable(productUrl).then(() => {
                                notify(configManager.getNotificationData(), productUrl);
                            });
                        }
                    });
                }catch (e) {
                    console.log('Error: ', e);
                }
            }

        }, 30000);
    });

}catch (e) {
    console.log('Error: ', e);
}
