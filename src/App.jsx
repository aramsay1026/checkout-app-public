import React, { useEffect, useState } from "react";
import styled from 'styled-components';
import CheckOut from './routes/CheckOut';
import OrderComplete from './routes/OrderComplete';
import ReviewCart from './routes/ReviewCart';
import CartContext, { defaultCart } from './providers/CartContext';
import ShippingAndBillingContext, { defaultShippingAndBilling } from './providers/ShippingAndBillingContext';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

const NavBar = styled.nav`
  display: block;
  width: 100%;
  height: 3em;
  background: #2f4fec;
`;

const NavTitle = styled.span`
  color: white;
  font-family: Arial, Helvetic, sans-serif;
  position: relative;
  top: .75em;
  left: 3em;
  height: 40vmin;
  pointer-events: none;
`;

const CheckoutButtonContainer = styled.div`
  display: inline-block;
  position: absolute;
  top: .75em;
  right: 5em;
`;

const CheckOutIcon = styled.i`
  display: inline-block;
  background-image: url("cart.svg");
  width: 25px;
  height: 23px;
`;

const CartTotalText = styled.span`
  background-color: white;
  border-radius: 50%;
  display: inline-block;
  padding: 0 0.4em;
`;

function cartButton(cart) {
  const totalItems = cart.reduce(function (acc, item) {
    return acc + item.quantity;
  }, 0);

  return (
    <CheckoutButtonContainer><CheckOutIcon></CheckOutIcon><CartTotalText>{totalItems}</CartTotalText></CheckoutButtonContainer>
  )
}

export default function App() {
  const [cart, setCart] = useState(defaultCart);
  const [shippingAndBilling, setShippingAndBilling] = useState(defaultShippingAndBilling);

  const cartContextValue = {
    cart,
    setCart
  };

  const shippingAndBillingContextValue = {
    shippingAndBilling,
    setShippingAndBilling
  };

  return (
    <ShippingAndBillingContext.Provider value={shippingAndBillingContextValue}>
      <CartContext.Provider value={cartContextValue}>
        <Router>
          <div>
            <NavBar>
              <Link style={{ 'text-decoration': 'none' }} to="/">
                <NavTitle>Assemble Store</NavTitle>
              </Link>
              <Link to="/">{cartButton(cart)}</Link>
            </NavBar>
            <Switch>
              <Route path="/check-out">
                <CheckOut />
              </Route>
              <Route path="/order-complete">
                <OrderComplete />
              </Route>
              <Route path="/">
                <ReviewCart />
              </Route>
            </Switch>
          </div>
        </Router>
      </CartContext.Provider>
    </ShippingAndBillingContext.Provider>
  );
}
