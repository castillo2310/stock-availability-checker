const suppliers = [
    {name: "El Corte Inglés", value: "eci", hostname: "elcorteingles.es"},
    {name: "Decathlon", value: "decathlon", hostname: "decathlon.es"}
];

module.exports = class Supplier {

    constructor(value) {
        this.value = value;

        this.validate();
    }

    validate() {
        const supplierFound = suppliers.find(s => s.value === this.value);
        if (!supplierFound) throw new Error('Supplier not found.');
    }

    static createFromUrl(url) {
        const hostname = new URL(url).hostname;
        const supplier = suppliers.find(s =>  hostname.indexOf(s.hostname) !== -1);
        if (!supplier) throw new Error('Supplier not found.');

        return new this(supplier.value)
    }
};


