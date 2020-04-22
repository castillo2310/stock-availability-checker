const request = require('request-promise-native');

/**
 * Does the request and returns a promise with boolean availability value
 * @param product
 * @returns {Promise<boolean>}
 */
const isProductAvailable = async (product) => {
    return new Promise((resolve, reject) => {

        let productId = getProductId(product.url);
        if (!productId) reject('ProductId not found.');

        const stockUrl = 'https://www.elcorteingles.es/api/stock?products=' + productId;
        request(stockUrl, {json: true}).then( (result) => {
            const available = result.ADD ? true : false;
            resolve( available );
        }).catch((error) => {
            reject(error);
        });

    });
};

/**
 * Parses the url to get the product id
 * @param url
 * @returns {string}
 */
const getProductId = (url) => {
    try {
        let slashPosition = url.lastIndexOf('/');
        if ( !url[slashPosition + 1] ) slashPosition = url.substring(0, slashPosition).lastIndexOf('/');
        if( slashPosition === -1 ) throw new Error('SlashPosition not found.');

        const productQueryString = url.substring(slashPosition + 1);

        const hyphenPosition = productQueryString.indexOf('-');
        if( hyphenPosition === -1 ) throw new Error('HyphenPosition not found.');

        return productQueryString.substring(0, hyphenPosition);
    }catch (e) {
        console.log('UrlParseError. Error: ',e);
        console.log('UrlParseError. URL: ',url)
    }
};

module.exports = isProductAvailable;
