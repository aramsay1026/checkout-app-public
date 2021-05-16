import React from "react";
import CheckOut from './routes/CheckOut.js';
import OrderComplete from './routes/OrderComplete.js';
import ReviewCart from './routes/ReviewCart.js';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

export default function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Review Cart </Link>
            </li>
            <li>
              <Link to="/check-out">Check Out</Link>
            </li>
          </ul>
        </nav>

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
  );
}
