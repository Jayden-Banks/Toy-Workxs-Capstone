import React from "react";
import "./OrderComplete.css";
import { useHistory } from "react-router";

function OrderComplete(props) {
  const orderNumber = props.location.id;
  const address = props.location.address;
  const payment = props.location.payment;
  const history = useHistory();

  const handleClick = () => {
    history.push("/");
  };

  return (
    <div className="div-full-page">
      <div className="div-page-title">
        <h1 className="h1-page-title">Order Complete</h1>
        <div id="div-order-complete-info">
          <h2 className="order-complete-info" id="h2-order-number">
            Order Number <br></br>{" "}
            <span className="span-order-number">#{orderNumber}</span>
          </h2>
          <h3
            className="order-complete-info h3-address-payment-summary"
            id="h3-order-name-address"
          >
            Name and Address: <br></br>{" "}
            <span className="span-order-number">{address} </span>
          </h3>
          <h3
            className="order-complete-info h3-address-payment-summary"
            id="h3-order-payment"
          >
            Order Payment: <br></br>{" "}
            <span className="span-order-number">${payment} </span>
          </h3>
          <button
            className="button-submit"
            id="button-order-complete"
            onClick={() => handleClick()}
          >
            Continue <br></br> Shopping
          </button>
        </div>
      </div>
    </div>
  );
}

export default OrderComplete;
