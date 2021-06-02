import React from "react";
import styled from 'styled-components';
import CartContext from '../providers/CartContext';
import ShippingAndBillingContext, {
    AddressFieldType,
    AddressType,
    ShippingAndBillingFieldType,
    ADDRESS_FIELD_TYPES,
    copyAddress,
    copyShippingAndBilling
} from '../providers/ShippingAndBillingContext';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import { Button, PageContainer, AlignRight, Table, TableRow, TableCell, HeavyText, LightText } from '../styles/AppStyle';
import { CartContextType } from "../providers/CartContext";

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

const ADDRESS_TYPE_PLACEHOLDER: AddressType = {
    name: 'Name',
    address1: 'Address',
    address2: 'Address (Second Line)',
    city: 'City',
    state: 'State',
    zip: 'ZIP Code',
    country: 'Country',
};

export default function OrderInfo() {
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

                    const tableCells = ADDRESS_FIELD_TYPES.map(function (fieldName: AddressFieldType) {
                        return (
                            <TableCell>
                                <FormField
                                    type="text"
                                    placeholder={ADDRESS_TYPE_PLACEHOLDER[fieldName]}
                                    value={getAddressFieldFactory(fieldName)}
                                    onChange={changeAddressFieldFactory(fieldName)}
                                />
                            </TableCell>
                        );
                    });

                    if ((tableCells.length % 2) > 0) {
                        tableCells.push(<TableCell />);
                    }

                    const halfTableCellsLen = tableCells.length / 2;
                    const tableRows = [];
                    for (let idx = 0; idx < halfTableCellsLen; ++idx) {
                        tableRows.push(
                            <TableRow>
                                {tableCells[idx]}
                                {tableCells[idx + halfTableCellsLen]}
                            </TableRow>
                        );
                    }

                    return (
                        <Table>
                            {tableRows}
                        </Table>
                    );
                }

                return (
                    <PageContainer>
                        <MarginBuffer>
                            <HeavyText>Shipping Address</HeavyText>
                            {renderAddressFields('shippingAddress')}
                            <FlexVerticalFlex>
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
                    </PageContainer>
                );
            }}
        </ShippingAndBillingContext.Consumer >
    );
}
