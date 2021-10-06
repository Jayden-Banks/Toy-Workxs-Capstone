import React from 'react'
import './OrderComplete.css'
/* // todo
  MVP
  - Create Header "Order Placed!"
  - Create Text with order number (which should come from payment after successful result from database)
  - Create "Continue Shopping" button
  - Link "Continue Shopping" to Home page

  Future Features
  - Create Text "Contact us Here" with button
  - Create div "Having issues" from other component
*/





function OrderComplete(props) {
  const orderNumber = props.location.id
  const address = props.location.address
  const payment = props.location.payment
  return (
    <div className="div-full-page">
      <div className="div-page-title">
        <h1 className="h1-page-title">Order Complete</h1>
        <h2 className="order-complete-info" id="h2-order-number">Order Number <br></br> #{orderNumber}</h2>
        <h3 className="order-complete-info" id="h3-order-name-address">Name and Address: <br></br> {address}</h3>
        <h3 className="order-complete-info" id="h3-order-payment">Order Payment: <br></br> ${payment}</h3>
        </div>
        </div>
  )
}

export default OrderComplete
