import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";

function OrderHistory(props) {
  const [orders, setOrders] = useState(props.location.orders);
  const history = useHistory()

  useEffect(() => {
    if(!orders) {
      history.push('/account')
    }
  })

  const displayOrders = () => {
    const copyOrders = [...orders];
    const res = copyOrders.map((order, index) => {
      const { id, address, payment } = order;
      return (
        <div className="div-individual-orderHistory" key={index}>
          <h3 className="h3-orderHistory-number">
            Order Number: <br></br>{" "}
            <span className="span-orderHistory-number">{id}</span>{" "}
          </h3>
          <h3 className="h3-orderHistory-number h3-orderHistory-address">
            Name & Address: <br></br>{" "}
            <span className="span-orderHistory-number">{address}</span>{" "}
          </h3>
          <h3 className="h3-orderHistory-number">
            Payment: <br></br>{" "}
            <span className="span-orderHistory-number">${payment}</span>{" "}
          </h3>
        </div>
      );
    });
    return res;
  };
  return (
    <div className="div-full-page">
      <div className="div-page-title">
        <h1 className="h1-page-title">Order History</h1>
        <Link to="/account">
          <h3 className="h3-sub-title h3-account-order">Account</h3>
        </Link>
      </div>
      <div id="div-orderHistory-orders">
        {orders ? (
          displayOrders()
        ) : (
          <h2 id="h2-orderHistory-loading">Loading</h2>
        )}
      </div>
    </div>
  );
}

export default OrderHistory;
