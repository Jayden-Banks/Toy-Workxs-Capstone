import "./AvatarDisplay.css";
import { useSelector } from "react-redux";
import React from "react";

function AvatarDisplay() {
  const user = useSelector((state) => state.user.user);
  return (
    <div>
      {user.avatar ? (
        <div
          id="div-pokemon"
          style={{ backgroundImage: `url(${user.avatar})` }}
        ></div>
      ) : (
        <div id="div-placeholder"></div>
      )}
    </div>
  );
}

export default AvatarDisplay;
