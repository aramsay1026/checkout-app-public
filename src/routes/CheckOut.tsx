import React from "react";
import styled from 'styled-components';
import ShippingAndBillingContext, {
    AddressFieldType,
    ShippingAndBillingFieldType,
    copyAddress,
    copyShippingAndBilling
} from '../ShippingAndBillingContext';

const FormField = styled.input`
`;

export default function CheckOut() {
    return (
        <ShippingAndBillingContext.Consumer>
            {(shippingAndBillingContextValue: any) => {
                const { shippingAndBilling, setShippingAndBilling } = shippingAndBillingContextValue;

                function changeNestedAddressFieldFactoryFactory(addressType: ShippingAndBillingFieldType) {
                    return function changeAddressFieldFactory(fieldName: AddressFieldType) {
                        return function changeAddressField(event: React.ChangeEvent<HTMLInputElement>) {
                            const nextShippingAndBilling = copyShippingAndBilling(shippingAndBilling);
                            const nextAddress = copyAddress(nextShippingAndBilling[addressType]);
                            nextAddress[fieldName] = event.target.value;
                            nextShippingAndBilling[addressType] = nextAddress;
                            setShippingAndBilling(nextShippingAndBilling);
                        };
                    };
                }

                function getNestedAddressFieldValueFactoryFactory(addressType: ShippingAndBillingFieldType) {
                    return function getAddressFieldValueFactory(fieldName: AddressFieldType) {
                        return shippingAndBilling[addressType][fieldName];
                    }
                }

                const changeShippingAddressFieldFactory = changeNestedAddressFieldFactoryFactory('shippingAddress');
                const changeBillingAddressFieldFactory = changeNestedAddressFieldFactoryFactory('billingAddress');

                const getShippingAddressFieldFactory = getNestedAddressFieldValueFactoryFactory('shippingAddress');
                const getBillingAddressFieldFactory = getNestedAddressFieldValueFactoryFactory('billingAddress');

                return (
                    <div>
                        <FormField
                            type="text"
                            placeholder="Shipping Name"
                            value={getShippingAddressFieldFactory('name')}
                            onChange={changeShippingAddressFieldFactory('name')}
                        />
                    </div>
                );
            }}
        </ShippingAndBillingContext.Consumer>
    );
}
