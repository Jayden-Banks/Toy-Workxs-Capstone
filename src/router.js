import React from "react";
import { Switch, Route } from 'react-router-dom'
// import PokemonList from "./components/PokemonList";
// import Pokemon from "./components/Pokemon";
import Cart from "./components/pages/cart/Cart"
import Home from "./components/pages/home/Home"
import Login from "./components/pages/login/Login"
import Account from "./components/pages/account/Account"
import BoardGame from "./components/pages/boardGame/BoardGame"
import CreateAccount from "./components/pages/createAccount/CreateAccount"
import Shipping from "./components/pages/checkout/shipping/Shipping";
import Payment from  "./components/pages/checkout/payment/Payment"
import orderComplete from "./components/pages/checkout/orderComplete/OrderComplete"
import CheckoutForm from "./components/pages/checkout/payment/CheckoutForm";
/* //todo
  -Add all routes for all of the pages needed here (Home, Product, Login, Cart, Account) (CreateAccount, Shipping, Payment, OrderComplete) <= children pages. 
  -import those routes above
  -should be able to move between all pages
*/
export default (
  <Switch>
    <Route exact path= "/" component={Home} />
    <Route path= "/cart" component={Cart} />
    <Route path= "/login" component={Login} />
    <Route path= "/account" component={Account} />
    <Route path= "/boardGame" component={BoardGame} />
    <Route path= "/createAccount" component={CreateAccount} />
    <Route path= "/shipping" component={Shipping} />
    <Route path= "/payment" component={Payment} />
    <Route path= "/review" component={orderComplete} />
  </Switch>
)