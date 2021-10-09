import React, { useEffect } from "react";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useHistory } from "react-router";

function Payment(props) {
  const history = useHistory()
  const address = props.location.addressInfo;
  const totalPrice = props.location.totalPrice;
  const discount = props.location.discount;
  useEffect(() => {
    if(!address || !totalPrice) {
      history.push('/cart')
    }
  }, [])

  const taxCalc = () => {
    let taxAmount = 0;
    taxAmount = totalPrice * 0.0485;
    taxAmount = taxAmount.toFixed(2);
    return +taxAmount;
  };

  const promise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx");
  return (
    <div className="div-full-page">
      <div className="div-page-title" id="div-payment-title">
        <h1 className="h1-page-title">Payment Info</h1>
        <div id="div-order-summary">
          <h4 className="h4-order">
            Discount:{" "}
            {discount ? (
              <span className="span-align-right">${discount}</span>
            ) : (
              <span className="span-align-right">$0.00</span>
            )}{" "}
          </h4>
          <h4 className="h4-order">
            Order: <span className="span-align-right">${totalPrice}</span>
          </h4>
          <h4 className="h4-order">
            Tax: <span className="span-align-right">${(taxCalc()).toFixed(2)}</span>
          </h4>
          <h4 className="h4-order" id="h4-order-shipping">
            Shipping: <span className="span-align-right">$5.00</span>
          </h4>
          <h4 className="h4-order">
            Total:{" "}
            <span className="span-align-right">
              ${(+totalPrice + taxCalc() + 5.0).toFixed(2)}
            </span>
          </h4>
        </div>
      </div>
      <Elements stripe={promise}>
        <CheckoutForm
          orderTotal={(+totalPrice + taxCalc() + 5.0).toFixed(2)}
          address={address}
        />
      </Elements>
    </div>
  );
}
export default Payment;
