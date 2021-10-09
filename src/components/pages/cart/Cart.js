import React, { useState } from "react";
import "../cart/Cart.css";
import CartItems from "./CartItems";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";

function Cart() {
  const history = useHistory();
  const [totalPrice, setTotalPrice] = useState(0);
  const [errorDisplay, setErrorDisplay] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const cart = useSelector((state) => state.cart.cart);

  const notificationSetter = (value) => {
    setErrorDisplay(value);
  };

  const handleClick = () => {
    console.log(promoCode);
    console.log(cart);
    if (totalPrice === 0) {
      setErrorDisplay("Nothing in cart");
      setTimeout(function () {
        setErrorDisplay("");
      }, 1500);
    } else if (
      promoCode === "MUSTHAVE" &&
      (cart.includes(1) ||
        cart.includes(3) ||
        cart.includes(4) ||
        cart.includes(5) ||
        cart.includes(6) ||
        cart.includes(7) ||
        cart.includes(8) ||
        cart.includes(9) ||
        cart.includes(73))
    ) {
      console.log("did run");
      history.push({
        pathname: "/shipping",
        totalPrice: (totalPrice * 0.9).toFixed(2),
        discount: (totalPrice * 0.1).toFixed(2),
      });
    } else if (promoCode) {
      setErrorDisplay("Invalid promo Code");
    } else {
      history.push({
        pathname: "/shipping",
        totalPrice: totalPrice.toFixed(2),
      });
    }
  };

  const handleChange = (value) => {
    setPromoCode(value);
  };

  return (
    <div className="div-full-page">
      <div className="div-page-title">
        <h1 className="h1-page-title">Shopping Cart</h1>
        <div className="div-cart-subheader">
          <h3 className="h3-cart-sub-title">Total: ${totalPrice}.00</h3>
          <button className="button-cart" onClick={() => handleClick()}>
            Check Out
          </button>
        </div>
      </div>
      <div id="div-cart-body">
        <div id="div-cart-items">
          <span id="span-cart-display">{errorDisplay}</span>
          <CartItems
            notificationSetter={notificationSetter}
            setTotalPrice={setTotalPrice}
            totalPrice={totalPrice}
          />
        </div>
        <hr className="hr-cart-total" />
        <div id="div-promo-code">
          Promo Code:{" "}
          <input
            id="input-promo-code"
            type="text"
            onChange={(e) => handleChange(e.target.value)}
            placeholder="Promo Code"
          />
        </div>
        <div className="div-cart-subheader" id="div-cart-subheader-bottom">
          <h3 className="h3-cart-sub-title">Total: ${totalPrice}.00</h3>
          <button className="button-cart" onClick={() => handleClick()}>
            Check Out
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
