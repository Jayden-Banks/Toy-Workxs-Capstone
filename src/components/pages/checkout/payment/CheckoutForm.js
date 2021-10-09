import React, { useState, useEffect } from "react";
import "./CheckoutForm.css";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import userSlice from "../../login/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { clearCart } from "../../cart/cartSlice";

export default function CheckoutForm(props) {
  const history = useHistory();
  // const address = props.address
  const orderTotal = +props.orderTotal;
  const user = useSelector((state) => state.user.user);
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const cart = useSelector((state) => state.cart.cart);

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    window
      .fetch("/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ total: orderTotal }),
      })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setClientSecret(data.clientSecret);
      });
  }, []);
  const cardStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: "Arial, sans-serif",
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };

  const postOrder = async () => {
    try {
      const body = {
        profileId: user.id,
        address: props.address,
        payment: orderTotal,
      };
      const res = await axios.post("/api/order", body);
      const { id, address, payment } = res.data;
      const orderInfo = {
        cart,
        orderId: id,
      };
      try {
        const orderProductRes = await axios.post(
          "/api/order-product",
          orderInfo
        );
        console.log(orderProductRes);
      } catch (err) {
        console.log(err);
      } finally {
        try {
          await axios.delete(`/api/cart/clear/${user.id}`);
        } catch (err) {
          console.log(err);
        }
        history.push({
          pathname: "/review",
          id,
          address,
          payment,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = async (event) => {
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };
  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setProcessing(true);
    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });
    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      setError(null);
      setProcessing(false);
      setSucceeded(true);
      postOrder();
    }
  };
  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <CardElement
        id="card-element"
        options={cardStyle}
        onChange={handleChange}
      />
      <button disabled={processing || disabled || succeeded} id="submit">
        <span id="button-text">
          {processing ? (
            <div className="spinner" id="spinner"></div>
          ) : (
            "Pay now"
          )}
        </span>
      </button>
      {/* Show any error that happens when processing the payment */}
      {error && (
        <div className="card-error" role="alert">
          {error}
        </div>
      )}
      {/* Show a success message upon completion */}
      <p className={succeeded ? "result-message" : "result-message hidden"}>
        Payment succeeded, see the result in your
        <a href={`https://dashboard.stripe.com/test/payments`}>
          {" "}
          Stripe dashboard.
        </a>{" "}
        Refresh the page to pay again.
      </p>
    </form>
  );
}
