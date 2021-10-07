import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import stratego from "../../../assets/product-test/stratego.jpeg";
import { itemAdded } from "../cart/cartSlice";
import "./BoardGame.css";
import GenreDisplay from "./GenreDisplay";

/* //todo
- Create header "Board Games"
- Create onChange search input (this might come from another component <productSearch>)
- Axios calls to handle onChange input (this or 1 call to get all board games... I think 1 call may be the way to go because there aren't many games)
- Create header, products (mobile 2, desktop 4), names, price, and add to cart buttons for each section (Classic, Card, Strategy, Kid's, Family, Collectable)
this might also come from another component (Product display)
- Add to cart buttons function and update the cart with the item

*/

function BoardGame() {
  const [currSearch, setCurrSearch] = useState("");
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cart)
  // console.log(cart)



  const handleChange = (value) => {
    setCurrSearch(value);
    console.log(value)
  };

  return (
    <div className="div-full-page">
      <div className="div-page-title">
        <h1 className="h1-page-title">
          Board<br></br>Games
        </h1>
        <input
          type="text"
          className="input-text-field input-search"
          placeholder="Board Game"
          onChange={(e) => handleChange(e.target.value)}
        />
      </div>
      {/* {currSearch ? <SearchBoardGame currSearch={currSearch}/> : */}
      <div className="div-all-products">
      <GenreDisplay currSearch={currSearch}/>
      </div>
    </div>
  );
}

export default BoardGame;

/* <div className="div-genre-group">
  <h3 className="h3-genre-headers">Strategy Games</h3>
  <div className="div-multiple-products">
    <div className="div-individual-product">
      <div
        className="div-product-image"
        style={{ backgroundImage: `url("${stratego}")` }}
      ></div>
      <h4 className="h4-product-title">Stratego</h4>
      <h4 className="h4-product-title">Price: $25.00</h4>
      <button className="button-product-add">ADD</button>
    </div>
    <div className="div-individual-product">
      <div
        className="div-product-image"
        style={{ backgroundImage: `url("${stratego}")` }}
      ></div>
      <h4 className="h4-product-title">Stratego</h4>
      <h4 className="h4-product-title">Price: $25.00</h4>
      <button className="button-product-add">ADD</button>
    </div>
  </div>
</div> */