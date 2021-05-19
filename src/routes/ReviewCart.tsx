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

const CheckoutButton = styled.button`
    color: gray;
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
        <tr>
            <td><ProductPicture {...props} /></td>
            <td>{props.name}</td>
            <td>{props.sku}</td>
            <td><ProductQuantity item={props} changeProductCount={changeProductCount} /></td>
            <td>${props.unitPrice}</td>
        </tr>
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
                    <div>
                        <table>
                            <tr>
                                <th>Your Cart</th>
                                <th><CartLabelText>QUANTITY</CartLabelText></th>
                                <th><CartLabelText>PRICE</CartLabelText></th>
                            </tr>
                            {cart.map((item: Item) => productItem(item, changeProductCount))}
                        </table>
                        <Link to="/check-out">
                            <CheckoutButton> Proceed To Checkout</CheckoutButton>
                        </Link>
                    </div>
                );
            }}
        </CartContext.Consumer>
    );
}
