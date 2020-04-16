const request = require('request-promise-native');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const productUrl = 'https://www.elcorteingles.es/deportes/A23220717-colchoneta-ejercicios-180-x-50-x-08-cm-boomerang/';

request(productUrl).then( (result) => {
    const dom = new JSDOM(result);
    const document = dom.window.document;

    const element = document.querySelector('a.event.add-to-cart');
    const productId = element.dataset.productId;

    const stockUrl = 'https://www.elcorteingles.es/api/stock?products='+productId;
    request(stockUrl, {json: true}).then( (result) => {
        console.log(result);
        if( result.ADD ) console.log('Product is available.');
        else console.log('Product sold out.')
    }).catch((error) => {
        console.log('error', error);
    });


}).catch((error) => {
    console.log('error', error);
});
