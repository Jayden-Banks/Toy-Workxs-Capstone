import React from "react";
import { Switch, Route } from 'react-router-dom'
import Cart from "./components/pages/cart/Cart"
import Home from "./components/pages/home/Home"
import Login from "./components/pages/login/Login"
import Account from "./components/pages/account/Account"
import BoardGame from "./components/pages/boardGame/BoardGame"
import CreateAccount from "./components/pages/createAccount/CreateAccount"
import Shipping from "./components/pages/checkout/shipping/Shipping";
import Payment from  "./components/pages/checkout/payment/Payment"
import orderComplete from "./components/pages/checkout/orderComplete/OrderComplete"
import OrderHistory from "./components/pages/account/OrderHistory";
import Avatar from "./components/pages/account/Avatar";
import Plushies from "./components/pages/plushies/Plushies"
import Toy from "./components/pages/toy/Toy"

export default (
  <Switch>
    <Route exact path= "/" component={Home} />
    <Route path= "/cart" component={Cart} />
    <Route path= "/login" component={Login} />
    <Route path= "/account" component={Account} />
    <Route path= "/boardGame" component={BoardGame} />
    <Route path= "/plushie" component={Plushies} />
    <Route path= "/toy" component={Toy} />
    <Route path= "/createAccount" component={CreateAccount} />
    <Route path= "/shipping" component={Shipping} />
    <Route path= "/payment" component={Payment} />
    <Route path= "/review" component={orderComplete} />
    <Route path= "/orderHistory" component={OrderHistory} />
    <Route path= "/avatar" component={Avatar} />
  </Switch>
)