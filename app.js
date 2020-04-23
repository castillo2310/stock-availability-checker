const checkProductAvailability = require('./src/Application/ProductAvailabilityChecker');
const requestData = require('./src/Application/DataRequester');
const notify = require('./src/Application/Notifier');

const delay = 30000;

requestData().then(({products, notification}) => {
    console.log('Starting to check availability...');

    (function checkStockAvailability(){

        let soldOutProducts = products.filter(p => !p.available);
        if (!soldOutProducts.length) return console.log('All products are available. Script ends.');

        for(let i=0;i<soldOutProducts.length;i++){
            let product = soldOutProducts[i];
            checkProductAvailability(product).then((isAvailable) => {
                if (isAvailable) {
                    product.available = true;
                    notify(notification, product);
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

