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
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState("");

  
  const taxCalc = () => {
    let taxAmount = 0
    const taxRate = 4.85
    taxAmount = totalPrice * 0.0485
    console.log(taxAmount, 'run run run')
    return taxAmount
  }
  // const validationSchema = Yup.object({
  //   cardholderName: Yup.string().required("Required"),
  //   creditCardNumber: Yup.string()
  //   .required("Required")
  //   .matches(/^[0-9]+$/, "Must be only digits")
  //   .min(16, 'Must be exactly 16 digits')
  //   .max(16, 'Must be exactly 16 digits'),
  //   type: Yup.string().required("Required"),
  //   CVC: Yup.string()
  //   .required("Required")
  //   .matches(/^[0-9]+$/, "Must be only digits")
  //   .min(3, 'Must be at least 3 digits')
  //   .max(4, 'Must be a max of 4 digits'),
  //   date: Yup.string()
  //     .required("Required"),
  // });
  
  // const formik = useFormik({
  //   initialValues: {
  //     cardholderName: "",
  //     creditCardNumber: "",
  //     type: "",
  //     CVC: "",
  //     date: "",
  //   },
  //   onSubmit: (values, onSubmitProps) => {
  //     const { cardholderName, creditCardNumber, type, CVC, date } = values;
  //     console.log(cardholderName, creditCardNumber, type, CVC, date)
  //   },
  //   validationSchema,
  // });

  const promise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx")
  
  
  
  console.log(totalPrice)
  
  return (
    <div className="div-full-page">
      <div className="div-page-title" id="div-payment-title">
        <h1 className="h1-page-title">Payment Info</h1>
    <div id="div-order-summary">
      <h4 className="h4-order">Order: <span className="span-align-right">${totalPrice}</span></h4>
      <h4 className="h4-order">Tax: <span className="span-align-right">${taxCalc()}</span></h4>
      <h4 className="h4-order" id="h4-order-shipping">Shipping: <span className="span-align-right">$5.00</span></h4>
      <h4 className="h4-order">Total: <span className="span-align-right">${totalPrice + taxCalc() + 5.00}</span></h4>
    </div>
      </div>

      {/* <div className="div-form">
        <h3 className="h3-error-submit">{submitError}</h3>
        <h3 className="h3-success-submit">{submitSuccess}</h3>
        <form className="form-login" onSubmit={formik.handleSubmit}>
          <div className="div-form-control">
            <label htmlFor="cardholderName">Cardholder Name</label>
            <input
              className="input-text-field"
              type="text"
              name="cardholderName"
              placeholder="Cardholder Name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.cardholderName}
            />
            {formik.touched.cardholderName && formik.errors.cardholderName ? (
              <div className="div-errors">{formik.errors.cardholderName}</div>
            ) : null}
          </div>
          <div className="div-form-control">
            <label htmlFor="creditCardNumber">Credit Card Number</label>
            <input
              className="input-text-field"
              type="text"
              name="creditCardNumber"
              placeholder="Number"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.creditCardNumber}
            />
            {formik.touched.creditCardNumber && formik.errors.creditCardNumber ? (
              <div className="div-errors">{formik.errors.creditCardNumber}</div>
            ) : null}
          </div>
          <div className="div-form-control">
            <label htmlFor="type">Card Type</label>
            <input
              className="input-text-field"
              type="text"
              name="type"
              placeholder="type"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.type}
            />
            {formik.touched.type && formik.errors.type ? (
              <div className="div-errors">{formik.errors.type}</div>
            ) : null}
          </div>
          <div className="div-form-control">
            <label htmlFor="CVC">CVC</label>
            <input
              className="input-text-field"
              type="text"
              name="CVC"
              placeholder="CVC"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.CVC}
            />
            {formik.touched.CVC && formik.errors.CVC ? (
              <div className="div-errors">{formik.errors.CVC}</div>
            ) : null}
          </div>
          <div className="div-form-control">
            <label htmlFor="date">Expiration Date</label>
            <input
              className="input-text-field"
              type="text"
              name="date"
              placeholder="Date"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.date}
            />
            {formik.touched.date && formik.errors.date ? (
              <div className="div-errors">{formik.errors.date}</div>
            ) : null}
          </div>
          <button className="button-submit" type="submit">
            Submit
          </button>
        </form>
      </div> */}





      <Elements stripe={promise}>

      <CheckoutForm orderTotal={totalPrice + taxCalc() + 5.00} address={address} />
      </Elements>




    </div>
  );
}

export default Payment;
