const request = require('request-promise-native');
const cheerio = require('cheerio');

const stockUrl = 'https://www.decathlon.es/es/ajax/rest/model/atg/commerce/order/purchase/CartModifierActor/addItemToOrder';

const checkProductAvailability = async (product) => {

    const productId = getProductId(product.url);
    const sku = await getSku(product.url);

    const result = await request.post(stockUrl, {
        json: {
            productId: productId,
            catalogRefIds: sku,
            quantity: 1
        }
    });

    return result.responseTO.errors.length === 0;
};

const getSku = async (productUrl) => {
    const html = await request(productUrl);
    const $ = cheerio.load(html);

    const ldJson = $('script[type="application/ld+json"]');

    for (let i=0;i<ldJson.length;i++) {
        const json = JSON.parse(ldJson[i].children[0].data);
        if (json['@type'] === 'product') {
            return json['offers'][0]['sku'];
        }
    }

    return undefined;
};


/**
 * Parses the url to get the product id
 * @param url
 * @returns {string}
 */
const getProductId = (url) => {
    try {
        const pattern = /(?<=R-p-)(.*)(?=\?mc)/;
        const match = url.match(pattern);

        return match[0];
    }catch (e) {
        console.log('UrlParseError. Error: ',e);
        console.log('UrlParseError. URL: ',url)
    }
};

module.exports = checkProductAvailability;
