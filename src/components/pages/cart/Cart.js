import React from 'react'
import { useDispatch } from 'react-redux'
import { itemAdded } from './cartSlice'
import { useSelector } from 'react-redux'

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
  const cart = useSelector((state) => state.cart.item)
  const dispatch = useDispatch()

  const handleChange = (value) => {
    dispatch(itemAdded(value))
  }
  

  return (
    <div>
      <input type="text" onChange={(e) => handleChange(e.target.value)} />
      <h2>Cart Page {cart}</h2>
    </div>
  )
}

export default Cart
