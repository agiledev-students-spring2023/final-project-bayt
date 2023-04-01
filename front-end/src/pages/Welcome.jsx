import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "./logo.png";
import "../index.css";

import "../css/Welcome.css";

function Welcome(props) {
  const navigate = useNavigate();

  const handleClick = (evt) => {
    evt.preventDefault();
    // const data = new FormData(evt.currentTarget);
    // console.log({
    //   email: data.get('email'),
    //   password: data.get('password'),
    // });
    navigate(`/${evt.target.id}`);
  };

  return (
    <div className="welcomePageContainer">
      <div className="welcomeLogoContainer">
        <img src={logo} className="welcomeLogo" alt="Bayt Logo" />
      </div>
      <div className="welcomeButtonsContainer">
        <button
          className="welcomePageButtons"
          id="signup"
          onClick={handleClick}>
          Create house
        </button>
        <button className="welcomePageButtons" id="login" onClick={handleClick}>
          Log in
        </button>
      </div>
    </div>
  );
}

export default Welcome;
