import React from "react";
import { useFormik } from "formik"
import * as Yup from "yup";
import { useState } from 'react';
import { useHistory } from 'react-router';
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"


/* //todo 
  MVP
  - Create Header "Payment Info"
  - Create a form with 2 inputs (credit card, CVC) and 2 drop downs with creditcard type and exp date
  - Create onSubmit handle that posts info from SHIPPING screen and payment info to the database and creates an order
  - Links "Submit Order" to OrderCompleted screen and send params(order number) which should come from successful post to database
  - Create Text with order price (order, tax, shipping costs, total) 

  Future Features
  - Create "contact us" (other component)
*/

function Payment(props) {
  const address = props.location.addressInfo;
  const totalPrice = props.location.totalPrice
  const discount = props.location.discount
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState("");

  
  const taxCalc = () => {
    let taxAmount = 0
    const taxRate = 4.85
    taxAmount = totalPrice * 0.0485
    console.log(taxAmount, 'run run run')
    taxAmount = taxAmount.toFixed(2)
    return +taxAmount
  }

  const promise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx")
  
  
  
  console.log(totalPrice)
  
  return (
    <div className="div-full-page">
      <div className="div-page-title" id="div-payment-title">
        <h1 className="h1-page-title">Payment Info</h1>
    <div id="div-order-summary">

      <h4 className="h4-order">Discount: {discount ? <span className="span-align-right">${discount}</span> : <span className="span-align-right">$0.00</span>} </h4>
      <h4 className="h4-order">Order: <span className="span-align-right">${totalPrice}</span></h4>
      <h4 className="h4-order">Tax: <span className="span-align-right">${taxCalc()}</span></h4>
      <h4 className="h4-order" id="h4-order-shipping">Shipping: <span className="span-align-right">$5.00</span></h4>
      <h4 className="h4-order">Total: <span className="span-align-right">${(+totalPrice + taxCalc() + 5.00).toFixed(2)}</span></h4>
    </div>
      </div>

     




      <Elements stripe={promise}>

      <CheckoutForm orderTotal={(+totalPrice + taxCalc() + 5.00).toFixed(2)} address={address} />
      </Elements>




    </div>
  );
}

export default Payment;
