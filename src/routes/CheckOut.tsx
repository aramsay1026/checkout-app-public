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
import { Button, PageContainer, AlignRight, Table, TableRow, TableCell, HeavyText, LightText } from '../AppStyle';

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

const ContentMargin = styled.div`
    margin-bottom: 50px;
`;

const FormField = styled.input`
    display: inline-block;
    width: 100%;
    border-radius: 5px;
    border: none;
    padding: 0.5em;
`;

const LinkText = styled.div`
    position: relative;
    bottom: 2em;
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

                function renderAddressFields(addressType: ShippingAndBillingFieldType) {
                    const changeAddressFieldFactory = changeNestedAddressFieldFactoryFactory(addressType);
                    const getAddressFieldFactory = getNestedAddressFieldValueFactoryFactory(addressType);

                    return (
                        <Table>
                            <TableRow>
                                <TableCell>
                                    <FormField
                                        type="text"
                                        placeholder="Name"
                                        value={getAddressFieldFactory('name')}
                                        onChange={changeAddressFieldFactory('name')}
                                    />
                                </TableCell>
                                <TableCell>
                                    <FormField
                                        type="text"
                                        placeholder="Street Address"
                                        value={getAddressFieldFactory('address1')}
                                        onChange={changeAddressFieldFactory('address1')}
                                    />
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <FormField
                                        type="text"
                                        placeholder="Address 2"
                                        value={getAddressFieldFactory('address2')}
                                        onChange={changeAddressFieldFactory('address2')}
                                    />
                                </TableCell>
                                <TableCell>
                                    <FormField
                                        type="text"
                                        placeholder="City"
                                        value={getAddressFieldFactory('city')}
                                        onChange={changeAddressFieldFactory('city')}
                                    />
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <FormField
                                        type="text"
                                        placeholder="State"
                                        value={getAddressFieldFactory('state')}
                                        onChange={changeAddressFieldFactory('state')}
                                    />
                                </TableCell>
                                <TableCell>
                                    <FormField
                                        type="text"
                                        placeholder="Country"
                                        value={getAddressFieldFactory('country')}
                                        onChange={changeAddressFieldFactory('country')}
                                    />
                                </TableCell>
                            </TableRow>
                        </Table>
                    );
                }

                return (
                    <PageContainer>
                        <MarginBuffer>
                            <HeavyText>Shipping Address</HeavyText>
                            {renderAddressFields('shippingAddress')}
                            <FlexVerticalFlex>
                                // makeshift checkbox, needs logic
                                    <Checkbox>
                                </Checkbox>
                                <LightText>Same as billing?</LightText>
                            </FlexVerticalFlex>
                            <HeavyText>Billing Address</HeavyText>
                            {renderAddressFields('billingAddress')}
                            <Link to="/order-complete">
                                <Button> Place Order</Button>
                            </Link>
                            <AlignRight>
                                <LinkText>
                                    <Link to="/">
                                        Return to Cart
                                    </Link>
                                </LinkText>
                            </AlignRight>
                        </MarginBuffer>
                    </PageContainer >
                );
            }}
        </ShippingAndBillingContext.Consumer >
    );
}
