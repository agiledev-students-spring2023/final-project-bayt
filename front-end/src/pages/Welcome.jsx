import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "./logo.png";
import "../index.css";
import image1 from "../assets/backgrounds/1.jpg";
import image2 from "../assets/backgrounds/2.jpg";
import image3 from "../assets/backgrounds/3.jpg";
import image4 from "../assets/backgrounds/4.jpg";

import "../css/Welcome.css";

function Welcome(props) {
  const navigate = useNavigate();

  const handleClick = (evt) => {
    evt.preventDefault();
    navigate(`/${evt.target.id}`);
  };

  const images = [image1, image2, image3, image4];

  function getRandomImage() {
    const index = Math.floor(Math.random() * images.length);
    return images[index];
  }

  useEffect(() => {
    const backgroundImage = getRandomImage();
    const welcomePageContainer = document.querySelector('.welcomePageContainer');
    welcomePageContainer.style.backgroundImage = `url(${backgroundImage})`;
  }, []);  

  return (
    <div>
      <div className="welcomePageContainer">
        <div className="welcomeContainer">
          <img src={logo} className="welcomeLogo" alt="Bayt Logo" />
          <h3 className="welcomeText">
            Meet your Baytmates.
          </h3>
        </div>
        <div className="welcomeButtonsContainer">
          <button
            className="welcomePageButtons"
            id="signup"
            onClick={handleClick}>
            Create house
          </button>
          <button
            className="welcomePageButtons"
            id="login"
            onClick={handleClick}>
            Log in
          </button>
        </div>
      </div>
    </div>
  );
}

export default Welcome;
