import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router";
import { logout } from "../login/userSlice";

/* // todo
MVP
- Create Header "{USER} Account"
- Create link "Order History" to Order History page

Future Features
- Create change password option
- Create Link to Pokemon Screen "Choose New Icon"
- Create Link "Reset Icon" that resets profile icon to default or null
- Create Link "Delete Account" that pops up Delete Account popup
- Delete Account popup sends axios delete call to database for account

*/

function Account() {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const signout = () => {
    dispatch(logout());
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
        <h3 className="h3-sub-title" onClick={() => signout()}>
          Signout
        </h3>
      </div>
    </div>
  );
}

export default Account;
