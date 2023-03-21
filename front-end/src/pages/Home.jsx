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
        <Link>
          <button class="roomButton" type="button">
            Add Room
          </button>
        </Link>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
