import React from 'react';

type AddressFieldType = 'name' | 'address1' | 'address2' | 'city' | 'state' | 'zip' | 'country';
type AddressType = { [Key in AddressFieldType]: string };

type ShippingAndBillingFieldType = 'shippingAddress' | 'billingAddress';
type ShippingAndBillingType = { [Key in ShippingAndBillingFieldType]: AddressType };

type SetShippingAndBillingType = (shippingAndBilling: ShippingAndBillingType) => void;
type ShippingAndBillingContextType = {
    shippingAndBilling: ShippingAndBillingType,
    setShippingAndBilling: SetShippingAndBillingType,
};

const defaultAddress = {
    name: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zip: '',
    country: '',
};

function copyAddress(address: AddressType): AddressType {
    return Object.assign({}, address);
}

const defaultShippingAndBilling: ShippingAndBillingType = {
    shippingAddress: copyAddress(defaultAddress),
    billingAddress: copyAddress(defaultAddress),
};

function copyShippingAndBilling(shippingAndBilling: ShippingAndBillingType): ShippingAndBillingType {
    return Object.assign({}, shippingAndBilling);
}

const ShippingAndBillingContext = React.createContext({
    shippingAndBilling: defaultShippingAndBilling,
    setShippingAndBilling: (cart: SetShippingAndBillingType) => { }
});

export default ShippingAndBillingContext;
export type { AddressFieldType, AddressType, ShippingAndBillingFieldType, ShippingAndBillingType, SetShippingAndBillingType, ShippingAndBillingContextType };
export { defaultShippingAndBilling, copyAddress, copyShippingAndBilling };
