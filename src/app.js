const request = require('request-promise-native');
const getProductId = require('./utils/urlParser');

const productUrl = 'https://www.elcorteingles.es/electronica/A24296906-impresora-multifuncion-hp-deskjet-2630-wi-fi-instant-ink';

try {
    const productId = getProductId(productUrl);
    if( !productId ) throw new Error('ProductId not found.');

    const stockUrl = 'https://www.elcorteingles.es/api/stock?products='+productId;
    request(stockUrl, {json: true}).then( (result) => {

        if( result.ADD ) console.log('Product is available.');
        else console.log('Product sold out.');

    }).catch((error) => {
        console.log('Error: ', error);
    });

}catch (e) {
    console.log('Error: ', e);
}
