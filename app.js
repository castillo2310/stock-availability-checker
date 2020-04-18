
const getProductId = require('./src/urlParser');
const isProductAvailable = require('./src/productAvailability');
const requestUserData = require('./src/userDataRequester');
const notify = require('./src/notifier');

/**
 * TODO:
 * 1.- Send notification when a product is available.
 * 2.- Loop until all products are available or execution is stopped.
 * 3.- Stop requesting availability of a product if already is available.
 * 4.- User can provide a file with the required data instead of using the prompt (by argv).
 */

try {

    requestUserData().then((userData) => {
        if( !userData.productUrl.length ) return console.log('At least one product url is required.');

        let interval = setInterval(() => {

            for(let i=0;i<userData.productUrl.length;i++){
                try {
                    let productUrl = userData.productUrl[i];
                    let productId = getProductId(productUrl);
                    if (!productId) throw new Error('ProductId not found.');

                    const stockUrl = 'https://www.elcorteingles.es/api/stock?products=' + productId;
                    isProductAvailable(stockUrl).then((available) => {

                        if( available ){
                            notify(userData.notification, productUrl);
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
