import React from "react";
import "../css/Home.css";
import "../index.css";
import Header from "./Header";
import Footer from "./Footer";
import { Link } from "react-router-dom";

const Home = (props) => {
  return (
    <div className="homeBody">
      <Header title="Home" />
      <div className="bodyButtons">
        <div class="room">
          <Link to="/tasks">
            <button class="roomButton" type="button">
              Living Room
            </button>
          </Link>
          <Link to="/tasks">
            <button class="roomButton" type="button">
              Bathroom
            </button>
          </Link>
        </div>
        <div className="addRoom">
          <button class="roomButton" type="button">
            Add Room
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
