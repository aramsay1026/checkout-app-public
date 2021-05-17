import React from "react";
import styled from 'styled-components'
import CartContext from '../CartContext';
import type { Item } from '../CartContext';

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
            <td><ProductQuantity item={props} changeProductCount={changeProductCount} /></td>
            <td>${props.unitPrice}</td>
            <td>{props.name}</td>
            <td>{props.sku}</td>
        </tr>
    )
}

export default function ReviewCart() {
    // const item = props.Item;
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
                    <table>
                        <tr>
                            <th>Your Cart</th>
                            <th>QUANTITY</th>
                            <th>PRICE</th>
                        </tr>
                        {cart.map((item: Item) => productItem(item, changeProductCount))}
                    </table>
                );
            }}
        </CartContext.Consumer>
    );
}
