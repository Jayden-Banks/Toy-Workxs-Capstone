import React, { useState } from "react";
import "./BoardGame.css";
import GenreDisplay from "./GenreDisplay";

function BoardGame() {
  const [currSearch, setCurrSearch] = useState("");

  const handleChange = (value) => {
    setCurrSearch(value);
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
      <div className="div-all-products">
        <GenreDisplay currSearch={currSearch} />
      </div>
    </div>
  );
}

export default BoardGame;
