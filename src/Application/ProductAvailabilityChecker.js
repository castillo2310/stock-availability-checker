const supplierCheckers = {
    eci: require('../Infrastructure/ProductAvailabilityChecker_eci'),
    decathlon: require('../Infrastructure/ProductAvailabilityChecker_decathlon')
};

const checkProductAvailability = async (product) => {
    const availabilityChecker = getSupplierChecker(product.supplier);

    return availabilityChecker(product);
};

const getSupplierChecker = (supplier) => {
    if( !supplierCheckers.hasOwnProperty(supplier.value) ) throw new Error("Supplier checker "+supplier.value+" not found");
    return supplierCheckers[supplier.value];
};

module.exports = checkProductAvailability;
