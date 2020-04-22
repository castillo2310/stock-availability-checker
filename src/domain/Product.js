const supplierList = require('./SupplierList');

module.exports = class Product{

    #url = '';
    #supplier = '';
    #available = false;

    constructor(url, supplier, available) {
        this.#url = url;
        this.#supplier = supplier;
        this.available = available;

        this.#validate();
    }
    #validate = () => {
        if( typeof this.#url !== 'string' ) throw new Error('Url must be a string');
        if( this.#url === '' ) throw new Error('Url not be empty');

        if( typeof this.#supplier !== 'string' ) throw new Error('Supplier must be a string');
        if( !supplierList.hasOwnProperty(this.#supplier) ) throw new Error('Supplier must be in the supplier list');
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
};
