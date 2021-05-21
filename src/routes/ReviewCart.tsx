import React from "react";
import styled from 'styled-components'
import CartContext from '../CartContext';
import type { Item } from '../CartContext';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

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

const CartLabelText = styled.span`
    padding: 0 1em;
    color: gray;
`;

const YourCartText = styled.span`
    position: relative;
    top: -0.3em;
    font-weight: bold;
    font-size: 1.5em;
`;

const CheckoutButton = styled.button`
    border: none;
    color: gray;
    border-radius: 25px;
    font-family: 'SF Pro Text';
    padding: .8em;
    font-size: 1.2em;
`;

const AlignRight = styled.div`
    width: 100%;
    text-align: right;
`;

const PageContainer = styled.div`
    font-family: 'SF Pro Text';
    margin: 3em auto;
    border-radius: 65px;
    background-color: #fafafa;
    width: 960px;
    padding: 35px 54px;
`;

const Table = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0 0 3em 0;
    padding: 0;
`;

const TableRow = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
`;

const TableCell = styled.div`
    text-align: center;
    box-sizing: border-box;
    flex-grow: 1;
    width: 25%;  // Default to full width
    padding: 0.8em 1.2em;
    overflow: hidden; // Or flex might break
    list-style: none;
    border: solid @bw white;
    background: fade(slategrey,20%);
    > h1, > h2, > h3, > h4, > h5, > h6 { margin: 0; }
`;

const CellContents = styled.div`
    margin: 35% auto 0;
    text-align: center;
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
                                <TableCell><YourCartText>Your Cart</YourCartText></TableCell>
                                <TableCell><CartLabelText>ITEM</CartLabelText></TableCell>
                                <TableCell><CartLabelText>QUANTITY</CartLabelText></TableCell>
                                <TableCell><CartLabelText>PRICE</CartLabelText></TableCell>
                            </TableRow>
                            {cart.map((item: Item) => productItem(item, changeProductCount))}
                        </Table>
                        <AlignRight>
                            <Link to="/check-out">
                                <CheckoutButton> Proceed To Checkout</CheckoutButton>
                            </Link>
                        </AlignRight>
                    </PageContainer>

                );
            }}
        </CartContext.Consumer>

    );
}
