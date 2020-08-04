const Supplier = require('./Supplier');

module.exports = class Product {

    constructor(url, supplier, available) {
        this.url = url;
        this.supplier = supplier;
        this.available = available;
    }

    static create(url) {
        let supplier = Supplier.createFromUrl(url);
        let available = false;

        return new this(url, supplier, available);
    }
};
