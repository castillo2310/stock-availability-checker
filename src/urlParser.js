/**
 * Gets product id from given url
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

module.exports = getProductId;
