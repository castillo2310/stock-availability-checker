const request = require('request-promise-native');
const prompts = require('prompts');
const getProductId = require('./utils/urlParser');

try {

    const questions = [
        {
            name: 'productUrl',
            type: 'text',
            message: 'Enter product URL'
        }
    ];
    const onCancel = () => process.exit();

    prompts(questions, {onCancel}).then((answers) => {

        const productUrl = answers.productUrl;

        const productId = getProductId(productUrl);
        if( !productId ) throw new Error('ProductId not found.');

        const stockUrl = 'https://www.elcorteingles.es/api/stock?products='+productId;
        request(stockUrl, {json: true}).then( (result) => {

            if( result.ADD ) console.log('Product is available.');
            else console.log('Product sold out.');

        }).catch((error) => {
            console.log('Error: ', error);
        });

    }).catch((error) => {
        console.log('error prompts', error);
    });

}catch (e) {
    console.log('Error: ', e);
}
