
const getProductId = require('./src/urlParser');
const isProductAvailable = require('./src/productAvailability');
const requestUserData = require('./src/dataRequester');

try {

    requestUserData().then((data) => {

        if( !data.productUrl.length ) return console.log('At least one product url is required.');

        for(let i=0;i<data.productUrl.length;i++){
            try {
                let productUrl = data.productUrl[i];
                let productId = getProductId(productUrl);
                if (!productId) throw new Error('ProductId not found.');

                const stockUrl = 'https://www.elcorteingles.es/api/stock?products=' + productId;
                isProductAvailable(stockUrl).then((available) => {
                    console.log('Product available: ', available);
                });
            }catch (e) {
                console.log('Error: ', e);
            }
        }
    });

}catch (e) {
    console.log('Error: ', e);
}
