import React, { useState } from "react";
import '../cart/Cart.css'
import CartItems from "./CartItems";
import { useHistory } from "react-router";
// import { useDispatch } from 'react-redux'
// import { itemAdded } from './cartSlice'
// import { useSelector } from 'react-redux'

/* //todo
  MVP
  - Create a header "Cart"
  - Create text "Total: {total} " that adds all prices of items in the cart state. Total is probably a state depending on what's in the cart.
  - Create "check out" button that links to the login page OR checkout page depending on the user logged in state. 
  - Display divs of items from cart with image, name, quantity, price and buttons letting user subtract, add or remove item from cart.
  - Create another text under displays "Total: {total} " that adds all prices of items in the cart state. Total is probably a state depending on what's in the cart.
  -
  
  Future Features
  - Add div "Having Issues? Contact us" (probably another component called here <ContactFooter />)
  - Promo code functionality, gives discounts based off of what's entered inside it
  - "check out" links to checkout as guest option also
*/

function Cart() {
  const history = useHistory()
  const [totalPrice, setTotalPrice] = useState(0)
  const [errorDisplay, setErrorDisplay] = useState('')

  const notificationSetter = (value) => {
    setErrorDisplay(value)
  }

  const handleClick = () => {
    history.push({
      pathname: '/shipping',
      totalPrice
    })
  }

  return (
    <div className="div-full-page">
      <div className="div-page-title">
        <h1 className="h1-page-title">Shopping Cart</h1>
        <div className="div-cart-subheader">
        <h3 className="h3-cart-sub-title">Total: ${totalPrice}.00</h3>
        <button className="button-cart" onClick={() => handleClick()}>Check Out</button>
        </div>
      </div>
      <div id="div-cart-body">
        <div id="div-cart-items">
          {errorDisplay}
          <CartItems notificationSetter={notificationSetter} setTotalPrice={setTotalPrice} totalPrice={totalPrice}/>
        </div>
      <hr className="hr-cart-total" />
      <div className="div-cart-subheader" id="div-cart-subheader-bottom">
        <h3 className="h3-cart-sub-title">Total: ${totalPrice}.00</h3>
        <button className="button-cart" onClick={() => handleClick()}>Check Out</button>
      </div>
      </div>
    </div>
  );
}

export default Cart;

// <div>
//   <input type="text" onChange={(e) => handleChange(e.target.value)} />
//   <h2>Cart Page {cart}</h2>
// </div>

// const cart = useSelector((state) => state.cart.item)
// const dispatch = useDispatch()

// const handleChange = (value) => {
//   dispatch(itemAdded(value))
// }
