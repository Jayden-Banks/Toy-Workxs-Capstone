import React, { useEffect, useState } from "react";
import "./Home.css";
import leftArrow from "../../../assets/navIcons/left-arrow.png";
import rightArrow from "../../../assets/navIcons/right-arrow.png";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import legos from '../../../assets/images/lego.jpeg'

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
  const plushies = [
    "https://toy-workxs.s3.us-west-1.amazonaws.com/plushies/dinosaur/angry-trex.jpg",
    "https://toy-workxs.s3.us-west-1.amazonaws.com/plushies/dinosaur/brontasaurus.jpg",
    "https://toy-workxs.s3.us-west-1.amazonaws.com/plushies/dinosaur/chomp.jpeg",
    "https://toy-workxs.s3.us-west-1.amazonaws.com/plushies/dinosaur/diplodocus.jpg",
    "https://toy-workxs.s3.us-west-1.amazonaws.com/plushies/dinosaur/mammoth.jpeg",
    "https://toy-workxs.s3.us-west-1.amazonaws.com/plushies/dinosaur/parasaurus.jpeg",
    "https://toy-workxs.s3.us-west-1.amazonaws.com/plushies/dinosaur/pterodactyl.png",
    "https://toy-workxs.s3.us-west-1.amazonaws.com/plushies/dinosaur/raptor.jpeg",
    "https://toy-workxs.s3.us-west-1.amazonaws.com/plushies/dinosaur/spinosaurus.jpeg",
    "https://toy-workxs.s3.us-west-1.amazonaws.com/plushies/dinosaur/triceratops.jpg"
  ]

  const [currIteration, setCurrIteration] = useState(0);
  const [plushieIteration, setPlushieIteration] = useState(0);
  const [currBoardGame, setCurrBoardGame] = useState("");
  const [currPlushie, setCurrPlushie] = useState("");

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
  const plushieAdRight = () => {
    setPlushieIteration((plushieIteration + 1) % plushies.length);
  };
  const plushieAdLeft = () => {
    if (plushieIteration > 0) {
      let nextIteration = (plushieIteration - 1) % plushies.length;
      setPlushieIteration(nextIteration);
    } else {
      setPlushieIteration(plushies.length - 1);
    }
  };

  const handleBoardGameClick = () => {
    history.push("/boardGame");
  };
  const handlePlushieClick = () => {
    history.push("/plushie");
  };

  const handleToyClick = () => {
    history.push("/toy")
  }

  useEffect(() => {
    setCurrBoardGame(boardGames[currIteration]);
    setCurrPlushie(plushies[plushieIteration])
  }, [boardGames, currIteration, plushies, plushieIteration]);

  return (
    <div id="div-home">
      <div id="div-plushie-ad">
        <Link to="/plushie">
          <h2 className="h2-header">Dinosaur Discounts</h2>
        </Link>
        <div id="div-plushie-ad-pictures" style={{ backgroundImage: `url(${currPlushie})`}}>
        <div id="div-input-arrows">
            <input
              type="image"
              className="input-arrows"
              src={leftArrow}
              alt="left arrow"
              onClick={() => plushieAdLeft()}
            />
            <input
              type="image"
              className="input-arrows"
              src={rightArrow}
              alt="right arrow"
              onClick={() => plushieAdRight()}
            />
          </div>
          <button className="button-add" onClick={() => handlePlushieClick()}>
            See Dinos
          </button>
        </div>
        <h2 className="h3-sale-header">
          All Dinosaurs Are Now $5.00 Cheaper!
        </h2>
      </div>

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
          <button className="button-add" onClick={() => handleBoardGameClick()}>
            Specials
          </button>
        </div>
      </div>
      <h2 className="h3-sale-header" id="h2-boardgame-sale">
        10% Off Total Order When Buying a Special With Coupon Code "MUSTHAVE"!
      </h2>
      <div id="div-plushie-ad">
        <Link to="/toy">
          <h2 className="h2-header">Lego Toys</h2>
        </Link>
      {/* <div id="div-signup"> */}
        <h2 className="h3-sale-header" id="h2-lego-products">
          New Lego Products Are Here!
        </h2>
      {/* </div> */}
        <div id="div-plushie-ad-pictures" style={{ backgroundImage: `url(${legos})`}}>
          <button className="button-add" onClick={() => handleToyClick()}>
            See Legos
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
