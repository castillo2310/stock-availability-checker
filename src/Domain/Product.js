const supplierList = require('./SupplierList');

module.exports = class Product{

    #url = '';
    #supplier = '';
    #available = false;

    constructor(url, available) {
        this.#url = url;
        this.#supplier = this.#getSupplierFromURL(url);
        this.available = available;

        this.#validate();
    }
    #validate = () => {
        if( typeof this.#url !== 'string' ) throw new Error('Url must be a string');
        if( this.#url === '' ) throw new Error('Url not be empty');
    };

    get url(){
        return this.#url;
    }

    get supplier(){
        return this.#supplier;
    }

    get available(){
        return this.#available;
    }

    set available(available){
        if( typeof available !== 'boolean' ) throw new Error('Supplier must be a boolean');
        this.#available = available;
    }

    #getSupplierFromURL = (productUrl) => {
        const hostname = new URL(productUrl).hostname;
        const supplier = supplierList.find(s => hostname.indexOf(s.hostname));
        if( !supplier ) throw new Error("Supplier not found in "+productUrl);

        return supplier.value;
    }
};
