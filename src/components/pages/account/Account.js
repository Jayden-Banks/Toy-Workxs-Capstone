import axios from "axios";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router";
import { logout } from "../login/userSlice";
import { useHistory } from "react-router-dom";
import "./Account.css";

function Account() {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const signout = () => {
    dispatch(logout());
  };

  const orderHistory = async () => {
    try {
      const res = await axios.get(`/api/order/${user.id}`);
      history.push({
        pathname: "/orderHistory",
        orders: res.data[0],
      });
    } catch (err) {
      console.log(err);
    }
  };
  const changeAvatar = async () => {
    history.push({
      pathname: "/avatar",
    });
  };

  return (
    <div className="div-full-page">
      <div className="div-page-title">
        {user ? (
          <h1 className="h1-page-title">{user.firstName}'s Account</h1>
        ) : (
          <Redirect to="/login" />
        )}
      </div>
      <div className="div-account-options">
        <h3
          className="h3-sub-title h3-account-order"
          onClick={() => orderHistory()}
        >
          Order History
        </h3>
        <h3
          className="h3-sub-title h3-account-order"
          onClick={() => changeAvatar()}
        >
          Set Profile Icon
        </h3>
        <h3 className="h3-sub-title h3-account-order" onClick={() => signout()}>
          Signout
        </h3>
      </div>
    </div>
  );
}

export default Account;
