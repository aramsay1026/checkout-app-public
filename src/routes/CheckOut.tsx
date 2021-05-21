import React from "react";
import styled from 'styled-components';
import ShippingAndBillingContext, {
    AddressFieldType,
    ShippingAndBillingFieldType,
    copyAddress,
    copyShippingAndBilling
} from '../ShippingAndBillingContext';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

const OrderFormContainer = styled.div`
    height: 100%;
    width: 50%;
    display: flex;
    align-items: center;
    background: linear-gradient(to bottom, #f3f3f3, #e6e6e6);
`;

const MarginBuffer = styled.div`
    margin: 10px;
`;

const InputContainer = styled.div`
    min-width: 30%;
    display: inline-block;
`;

const FlexVerticalFlex = styled.div`
    align-items: center;
`;

const Checkbox = styled.div`
    margin: 10px;
    height: 10px;
    width: 10px;
    border-radius: 50%;
    border: 1px solid #686868
`;

const HeavyText = styled.h1`
    font-family: 'SF Pro Text';
    font-weight: 900;
    color: #686868;
`;

const LightText = styled.h5`
    font-family: 'SF Pro Text';
    font-weight: 300;
    color: #686868;
    margin: 0
`;

const ContentMargin = styled.div`
    margin-bottom: 50px;
`;


const FormField = styled.input`
    display: inline-block;
`;

const PlaceOrderButton = styled.button`
    color: gray;
`;

// const formData = checkMark ? shippingData : billingData

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
                    <OrderFormContainer>
                        <MarginBuffer>
                            <HeavyText>Shipping Address</HeavyText>
                            <InputContainer>
                                <ContentMargin>
                                    <FormField
                                        type="text"
                                        placeholder="Name"
                                        value={getShippingAddressFieldFactory('name')}
                                        onChange={changeShippingAddressFieldFactory('name')}
                                    />
                                    <FormField
                                        type="text"
                                        placeholder="Street Address"
                                        value={getShippingAddressFieldFactory('address1')}
                                        onChange={changeShippingAddressFieldFactory('address1')}
                                    />
                                    <FormField
                                        type="text"
                                        placeholder="Address 2"
                                        value={getShippingAddressFieldFactory('address2')}
                                        onChange={changeShippingAddressFieldFactory('address2')}
                                    />
                                    <FormField
                                        type="text"
                                        placeholder="City"
                                        value={getShippingAddressFieldFactory('city')}
                                        onChange={changeShippingAddressFieldFactory('city')}
                                    />
                                    <FormField
                                        type="text"
                                        placeholder="State"
                                        value={getShippingAddressFieldFactory('state')}
                                        onChange={changeShippingAddressFieldFactory('state')}
                                    />
                                    <FormField
                                        type="text"
                                        placeholder="Country"
                                        value={getShippingAddressFieldFactory('country')}
                                        onChange={changeShippingAddressFieldFactory('country')}
                                    />
                                </ContentMargin>
                            </InputContainer>
                            <FlexVerticalFlex>
                                // makeshift checkbox, needs logic
                                    <Checkbox>
                                </Checkbox>
                                <LightText>Same as billing?</LightText>
                            </FlexVerticalFlex>
                            <LightText>Billing Address</LightText>
                            <InputContainer>
                                <ContentMargin>
                                    <FormField
                                        type="text"
                                        placeholder="Name"
                                        value={getShippingAddressFieldFactory('name')}
                                        onChange={changeShippingAddressFieldFactory('name')}
                                    />
                                    <FormField
                                        type="text"
                                        placeholder="Street Address"
                                        value={getShippingAddressFieldFactory('address1')}
                                        onChange={changeShippingAddressFieldFactory('address1')}
                                    />
                                    <FormField
                                        type="text"
                                        placeholder="Address 2"
                                        value={getShippingAddressFieldFactory('address2')}
                                        onChange={changeShippingAddressFieldFactory('address2')}
                                    />
                                    <FormField
                                        type="text"
                                        placeholder="City"
                                        value={getShippingAddressFieldFactory('city')}
                                        onChange={changeShippingAddressFieldFactory('city')}
                                    />
                                    <FormField
                                        type="text"
                                        placeholder="State"
                                        value={getShippingAddressFieldFactory('state')}
                                        onChange={changeShippingAddressFieldFactory('state')}
                                    />
                                    <FormField
                                        type="text"
                                        placeholder="Country"
                                        value={getShippingAddressFieldFactory('country')}
                                        onChange={changeShippingAddressFieldFactory('country')}
                                    />
                                </ContentMargin>
                            </InputContainer>
                            <Link to="/order-complete">
                                <PlaceOrderButton> Place Order</PlaceOrderButton>
                            </Link>
                            <Link to="/">
                                Return to Cart
                            </Link>
                        </MarginBuffer>
                    </OrderFormContainer>
                );
            }}
        </ShippingAndBillingContext.Consumer >
    );
}
