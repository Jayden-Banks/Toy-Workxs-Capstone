import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import "./Header.css";
import cartIcon from "../../assets/navIcons/cart-icon-test.png";
import profileIcon from "../../assets/navIcons/profile-icon.png";
import hamburgerIcon from "../../assets/navIcons/hamburger-icon.png";
import searchIcon from "../../assets/navIcons/search-icon.png";
import toyWorkxsIcon from "../../assets/images/toy-workxs-icon.png";
import exitIcon from "../../assets/navIcons/exit-icon.png";
import toyWorkxsBanner from "../../assets/images/toy-workxs-header.png";
import { login, logout } from "../pages/login/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { itemAdded } from "../pages/cart/cartSlice";
import axios from "axios";
/* //todo
  MVP
  - Create a fixed Header that is at the very top of screen
  - Needs all nav icons ( Logo, login, cart, profile) search is not mvp
  - Nav icons are links to pages (if user is not signed in then profile icon links to login page otherwise, account page)
  - Banner under header that has company name "Toy Workxs" in center
  - Should display if user is logged in with their name
  - Should display based off of mobile or desktop size
  - Mobile should have link to hamburger page
  - Desktop should have links to ALL pages listed in figma wireframe (Home, Board Games) start with these mvp
  - Create a sign out option 

  Future Features
  - Link "search Icon" to search screen
  - Create text "user" if logged in
*/

function Header() {
  const user = useSelector((state) => state.user.user);
  const { firstName } = user;
  const dispatch = useDispatch();
  const [menu, setMenu] = useState("true");
  const handleClick = () => {
    setMenu(!menu);
  };
  const logUserOut = () => {
    dispatch(logout());
  };
  useEffect(() => {
    if (localStorage.getItem("user")) {
      const user = JSON.parse(localStorage.getItem("user"));
      dispatch(login(user));
      const getCart = async () => {
        if (!user) {
          return "No user";
        }
        try {
          const res = await axios.get(`/api/cart/${user.id}`);
          res.data.map((element) => {
            dispatch(itemAdded(element.productId));
          });
        } catch (err) {
          console.log(err);
        }
      };
      getCart();
    }
  }, []);

  return (
    <div id="div-header">
      <div id="div-header-nav">
        <ul id="ul-header1-nav">
          <li id="li-hamburger-nav">
            <input
              type="image"
              alt="hamburger menu"
              className="input-black"
              src={`${menu ? hamburgerIcon : exitIcon}`}
              width="30px"
              onClick={() => handleClick()}
            />
          </li>
          <li id="li-login-signout">
            {user ? (
              <>
                <span id="span-media-query"> Welcome, </span>
                <Link to="/account">
                  <input type="button" id="input-login-nav" value={' ' + firstName} />
                </Link>
                <button id="button-sign-out" onClick={() => logUserOut()}>
                  Signout
                </button>
              </>
            ) : (
              <Link to="/login">
                <input type="button" id="input-login-nav" value="Login" />
              </Link>
            )}
          </li>
        </ul>
        <ul id="ul-header2-nav">
          <li>
            <Link to="/">
              <input
                type="image"
                alt="Home icon"
                src={toyWorkxsIcon}
                width="50px"
              />
            </Link>
          </li>
        </ul>

        <ul id="ul-header-mediaQuery-nav">
          <li>
            <Link to="/">
              <input
                type="button"
                className="input-hamburger"
                value="HOME"
              />
            </Link>
          
          </li>


          <li>
            <Link to="/boardGame">
              <input
                type="button"
                className="input-hamburger"
                value="BOARDGAMES"
              />
            </Link>
          </li>

          <li>
            <Link to="/cart">
              <input
                type="button"
                className="input-hamburger"
                value="CART"
              />
            </Link>
          </li>
          <li>
            <Link to={user ? "/account" : "/login"}>
              <input
                type="button"
                className="input-hamburger"
                value="ACCOUNT"
              />
            </Link>
          </li>


        </ul>


       

          




        <ul id="ul-header3-nav">
          <li>
            <Link to="/boardGame">
              <input
                type="image"
                alt="Search icon"
                className="input-black"
                src={searchIcon}
                width="30px"
              />
            </Link>
          </li>
          <li>
            <Link to="/cart">
              <input
                type="image"
                alt="Cart icon"
                className="input-black"
                src={cartIcon}
                width="40px"
              />
            </Link>
          </li>
          <li>
            <Link to={user ? "/account" : "/login"}>
              <input
                type="image"
                alt="Profile icon"
                className="input-black"
                src={user.avatar ? user.avatar : profileIcon}
                width={user.avatar ? "60px" : "30px"}
              />
            </Link>
          </li>
        </ul>
      </div>
      <div id="div-banner">
        <img
          src={toyWorkxsBanner}
          alt="Toy Workxs banner"
          id="img-toyWorkxs-banner"
          width="200px"
        />
      </div>

    



      <div
        id="div-hamburger"
        style={{ display: `${menu ? "none" : "inherit"}` }}
      >
        <ul id="ul-hamburger">
          <li>
            <Link to="/">
              <input
                type="button"
                className="input-hamburger input-black"
                value="HOME"
                onClick={() => handleClick()}
              />
            </Link>
          </li>
          <li>
            <Link to="/boardGame">
              <input
                type="button"
                className="input-hamburger"
                value="BOARD GAMES"
                onClick={() => handleClick()}
              />
            </Link>
          </li>
          <hr id="hr-hamburger"></hr>
          <li>
            <Link to="/cart">
              <input
                type="button"
                className="input-hamburger"
                value="CART"
                onClick={() => handleClick()}
              />
            </Link>
          </li>
          <li>
            <Link to={user ? "/account" : "/login"}>
              <input
                type="button"
                className="input-hamburger"
                value="ACCOUNT"
                onClick={() => handleClick()}
              />
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Header;
