const prompts = require('prompts');
const getProductId = require('./src/urlParser');
const isProductAvailable = require('./src/productAvailability');

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
        isProductAvailable(stockUrl).then( (available) => {
           console.log('Product available: ',available);
        });

    }).catch((error) => {
        console.log('error prompts', error);
    });

}catch (e) {
    console.log('Error: ', e);
}
