import React, { useState } from "react";
import PlushiesDisplay from "./PlushiesDisplay";

function BoardGame() {
  const [currSearch, setCurrSearch] = useState("");

  const handleChange = (value) => {
    setCurrSearch(value);
  };

  return (
    <div className="div-full-page">
      <div className="div-page-title">
        <h1 className="h1-page-title">
          Plushies
        </h1>
        <input
          type="text"
          className="input-text-field input-search"
          placeholder="Plushie"
          onChange={(e) => handleChange(e.target.value)}
        />
      </div>
      <div className="div-all-products">
        <PlushiesDisplay currSearch={currSearch} />
      </div>
    </div>
  );
}

export default BoardGame;
