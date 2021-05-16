import React from "react";
import styled from 'styled-components'

type Item = {
    sku: Number,
    unitPrice: Number,
    name: String,
    quantity: Number,
}

function productItem(props: Item) {
    return (
        <tr>
            <td>{props.sku}</td>
            <td>{props.unitPrice}</td>
            <td>{props.name}</td>
            <td>{props.quantity}</td>
        </tr>
    )
}

export default function ReviewCart() {
    const items = [{ sku: 38094374, unitPrice: 24.0, name: "Red Shirt", quantity: 2 }, { sku: 38094375, unitPrice: 24.0, name: "Blue Shirt", quantity: 1 }, { sku: 38094321, unitPrice: 12.0, name: "Blue socks", quantity: 4 }];
    // const item = props.Item;
    return (
        <table>
            <tr>
                <th>Your Cart</th>
                <th>QUANTITY</th>
                <th>PRICE</th>
            </tr>
            {items.map((item) => productItem(item))}
        </table>
    );
}
