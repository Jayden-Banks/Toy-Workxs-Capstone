import React, { useEffect, useState } from "react";
import "./Home.css";
import candyLand from "../../../assets/advertise/candy-land.png";
import carasonne from "../../../assets/advertise/carasonne.jpeg";
import pandemic from "../../../assets/advertise/pandemic.jpeg";
import leftArrow from "../../../assets/navIcons/left-arrow.png";
import rightArrow from "../../../assets/navIcons/right-arrow.png";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
/* //todo
  MVP
  Board Game section:
  - Add "Board Game Special" section. Should cycle through 3 or more board games
  - Add to cart buttons on board games should add it to the cart
  - Link "Board Game Special" heading to board game page
  - Add text "75% Off With Coupon code...."
  - Add button that switches to next board game

  Future
  Plushies section:
  - Add "Plushies pictures" section. Cycle throught 3 or more plushies. (Add above "Board Game Special" section)
  - "See them All" button should link to Plushies page 
  - Add text "Buy 1 Get 1 50% off" under plushies section
  - Should cycle through plushies every few seconds
  - Add button that switches to next plushie to view

  Sign up section:
  - Add "Sign up" header that links to create account page
  - Add text "Sign up for....." below header
  - Add picture of candy to entice
  - Add "Contact us" section at bottom (maybe don't include this)

  Board Game section: 
  - add bar that tells user how many more boardgames to check to left or right

*/

function Home() {
  const history = useHistory();
  const boardGames = [
    "https://toy-workxs.s3.us-west-1.amazonaws.com/product-images-toyworkxs/ad-special/Photosynthesis.jpeg",
    "https://toy-workxs.s3.us-west-1.amazonaws.com/product-images-toyworkxs/ad-special/coup.jpg",
    "https://toy-workxs.s3.us-west-1.amazonaws.com/product-images-toyworkxs/ad-special/forbidden-island.jpeg",
    "https://toy-workxs.s3.us-west-1.amazonaws.com/product-images-toyworkxs/ad-special/sharkbite.jpg",
    "https://toy-workxs.s3.us-west-1.amazonaws.com/product-images-toyworkxs/ad-special/codenames.jpeg",
    "https://toy-workxs.s3.us-west-1.amazonaws.com/product-images-toyworkxs/ad-special/5-second-rule.jpeg",
    "https://toy-workxs.s3.us-west-1.amazonaws.com/product-images-toyworkxs/ad-special/blokus.jpg",
    "https://toy-workxs.s3.us-west-1.amazonaws.com/product-images-toyworkxs/ad-special/dixit.jpeg",
    "https://toy-workxs.s3.us-west-1.amazonaws.com/product-images-toyworkxs/ad-special/qwirkle.jpg"
  ];
  const [currIteration, setCurrIteration] = useState(0);
  const [currBoardGame, setCurrBoardGame] = useState(candyLand);

  const boardGameAdRight = () => {
    console.log(currIteration, "clicked");
    setCurrIteration((currIteration + 1) % boardGames.length);
  };
  const boardGameAdLeft = () => {
    console.log(currIteration, "clicked");
    if (currIteration > 0) {
      let nextIteration = (currIteration - 1) % boardGames.length;
      setCurrIteration(nextIteration);
    } else {
      setCurrIteration(boardGames.length - 1);
    }
  };

  const handleClick = () => {
    history.push("/boardGame");
  };

  useEffect(() => {
    setCurrBoardGame(boardGames[currIteration]);
  }, [boardGames, currIteration]);

  return (
    <div id="div-home">
      <Link to="/boardGame">
        <h2 className="h2-header">Board Game Specials</h2>
      </Link>
      <div className="div-boardGame-ad">
        <div
          className="div-boardGame-ad-image"
          style={{ backgroundImage: `url(${currBoardGame})` }}
        >
          <div id="div-input-arrows">
            <input
              type="image"
              className="input-arrows"
              src={leftArrow}
              alt="left arrow"
              onClick={() => boardGameAdLeft()}
            />
            <input
              type="image"
              className="input-arrows"
              src={rightArrow}
              alt="right arrow"
              onClick={() => boardGameAdRight()}
            />
          </div>
          <button className="button-add" onClick={() => handleClick()}>
            Specials
          </button>
        </div>
      </div>
      <h2 className="h3-sale-header">
        50% Off With Coupon Code "MUSTHAVE" Today Only!
      </h2>
    </div>
  );
}

export default Home;
