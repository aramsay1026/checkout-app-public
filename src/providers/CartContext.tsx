import React from 'react';

type Item = {
    sku: number,
    unitPrice: number,
    name: string,
    quantity: number,
};

type CartType = Item[];
type SetCartType = (cart: Item[]) => void;
type CartContextType = {
    cart: CartType,
    setCart: SetCartType
};

const defaultCart: CartType = [
    { sku: 38094374, unitPrice: 24.0, name: "Red Shirt", quantity: 2 },
    { sku: 38094375, unitPrice: 24.0, name: "Blue Shirt", quantity: 1 },
    { sku: 38094321, unitPrice: 12.0, name: "Blue socks", quantity: 4 }
];

const CartContext = React.createContext({
    cart: defaultCart,
    setCart: (cart: CartType) => { }
});

export default CartContext;
export type { Item, CartType, SetCartType, CartContextType };
export { defaultCart };
