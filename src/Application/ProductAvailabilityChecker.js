const supplierCheckers = {
    eci: require('../Infrastructure/ProductAvailabilityChecker_eci')
};

const checkProductAvailability = async (product) => {
    const availabilityChecker = getSupplierChecker(product.supplier);
    return availabilityChecker(product);
};

const getSupplierChecker = (supplier) => {
    if( !supplierCheckers.hasOwnProperty(supplier) ) throw new Error("Supplier checker "+supplier+" not found");
    return supplierCheckers[supplier];
};

module.exports = checkProductAvailability;
