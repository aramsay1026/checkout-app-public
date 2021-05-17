import React, { useEffect, useState } from "react";
import styled from 'styled-components';
import CheckOut from './routes/CheckOut';
import OrderComplete from './routes/OrderComplete';
import ReviewCart from './routes/ReviewCart';
import CartContext, { defaultCart } from './CartContext';

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
  background: blue;
`;

const NavTitle = styled.span`
  color: white;
  font-family: Arial, Helvetic, sans-serif;
  font-size: 1em;
  position: relative;
  top: 1em;
  left: 3em;
`;

const CheckOutIcon = styled.i`
  display: inline-block;
  background-image: url("cart.svg");
  width: 25px;
  height: 23px;
  position: absolute;
  top: 1em;
  right: 5em;
`;

export default function App() {
  const [cart, setCart] = useState(defaultCart);

  const cartContextValue = {
    cart,
    setCart
  };

  return (
    <CartContext.Provider value={cartContextValue}>
      <Router>
        <div>
          <NavBar>
            <Link to="/">
              <NavTitle>Assemble Store</NavTitle>
            </Link>
            <Link to="/check-out"> <CheckOutIcon></CheckOutIcon></Link>
          </NavBar>

          {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
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
  );
}
