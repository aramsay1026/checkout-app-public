import React from "react";
import styled from 'styled-components';
import CartContext from '../CartContext';
import type { Item } from '../CartContext';
import { Button, PageContainer, AlignRight, Table, TableRow, TableCell, CellContents, TextLabelBold } from '../AppStyle';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import { TextLabelGray } from "../AppStyle";

const ProductPicture = styled.span`
    height: 183px;
    width: 183px;
    display: inline-block;
    background-image: url('${(props: Item) => props.sku + '.png'}');
`;

const PlusIcon = styled.span`
    height: 26px;
    width: 26px;
    display: inline-block;
    background-image: url('Add.svg');
`;

const MinusIcon = styled.span`
    height: 26px;
    width: 26px;
    display: inline-block;
    background-image: url('Minus.svg');
`;

const QuantityContainer = styled.span`
    display: inline-block;
`;

const ProductQuantityText = styled.span`
    display: inline-block;
    padding: 0 0.5em;
    position: relative;
    top: -0.4em;
`;

const SkuContainer = styled.div`
    text-align: center;
`;

type ChangeProductCountType = (item: Item, newCount: number) => void;
type ProductQuantityProps = {
    item: Item,
    changeProductCount: ChangeProductCountType
};

function ProductQuantity(props: ProductQuantityProps) {
    function onDecrement() {
        const { item } = props;
        props.changeProductCount(item, item.quantity - 1);
    }

    function onIncrement() {
        const { item } = props;
        props.changeProductCount(item, item.quantity + 1);
    }

    return (
        <span>
            <MinusIcon onClick={onDecrement}></MinusIcon>
            <ProductQuantityText>{props.item.quantity}</ProductQuantityText>
            <PlusIcon onClick={onIncrement}></PlusIcon>
        </span>
    )
}

function productItem(props: Item, changeProductCount: ChangeProductCountType) {
    return (
        <TableRow>
            <TableCell><ProductPicture {...props} /></TableCell>
            <TableCell><CellContents>{props.name} <SkuContainer>Sku:{props.sku}</SkuContainer></CellContents></TableCell>
            <TableCell><CellContents><ProductQuantity item={props} changeProductCount={changeProductCount} /></CellContents></TableCell>
            <TableCell><CellContents>${props.unitPrice}</CellContents></TableCell>
        </TableRow>
    )
}

export default function ReviewCart() {
    return (

        <CartContext.Consumer>
            {(cartContextValue: any) => {
                const { cart, setCart } = cartContextValue;

                const changeProductCount: ChangeProductCountType = (item: Item, newQuantity: number) => {
                    if (newQuantity <= 0) {
                        const itemIdx = cart.indexOf(item);
                        cart.splice(itemIdx, 1);
                        item.quantity = 0;
                    } else {
                        item.quantity = newQuantity;
                    }

                    setCart(cart.slice());
                };

                return (
                    <PageContainer>
                        <Table>
                            <TableRow>
                                <TableCell><TextLabelBold>Your Cart</TextLabelBold></TableCell>
                                <TableCell><TextLabelGray> ITEM</TextLabelGray></TableCell>
                                <TableCell><TextLabelGray> QUANTITY</TextLabelGray></TableCell>
                                <TableCell><TextLabelGray> PRICE</TextLabelGray></TableCell>
                            </TableRow>
                            {cart.map((item: Item) => productItem(item, changeProductCount))}
                        </Table>
                        <AlignRight>
                            <Link to="/check-out">
                                <Button> Proceed To Checkout</Button>
                            </Link>
                        </AlignRight>
                    </PageContainer>

                );
            }}
        </CartContext.Consumer>

    );
}
