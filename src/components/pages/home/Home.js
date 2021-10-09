import React, { useEffect, useState } from "react";
import "./Home.css";
import leftArrow from "../../../assets/navIcons/left-arrow.png";
import rightArrow from "../../../assets/navIcons/right-arrow.png";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";

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
    "https://toy-workxs.s3.us-west-1.amazonaws.com/product-images-toyworkxs/ad-special/qwirkle.jpg",
  ];
  const [currIteration, setCurrIteration] = useState(0);
  const [currBoardGame, setCurrBoardGame] = useState("");

  const boardGameAdRight = () => {
    setCurrIteration((currIteration + 1) % boardGames.length);
  };
  const boardGameAdLeft = () => {
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
        10% Off Total Order When Buying a Special With Coupon Code "MUSTHAVE"!
      </h2>
    </div>
  );
}

export default Home;
