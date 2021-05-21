import React, { useEffect, useState } from "react";
import styled from 'styled-components';
import CheckOut from './routes/CheckOut';
import OrderComplete from './routes/OrderComplete';
import ReviewCart from './routes/ReviewCart';
import CartContext, { defaultCart } from './CartContext';
import ShippingAndBillingContext, { defaultShippingAndBilling } from './ShippingAndBillingContext';

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

const CheckOutIcon = styled.i`
  display: inline-block;
  background-image: url("cart.svg");
  width: 25px;
  height: 23px;
  position: absolute;
  top: .75em;
  right: 5em;
`;

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
              <Link to="/"> <CheckOutIcon></CheckOutIcon></Link>
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
