import React from "react";
import "../css/Home.css";
import "../index.css";
import Header from "./Header";
import Footer from "./Footer";
import { Link } from "react-router-dom";

const Home = (props) => {
  return (
    <>
      <Header title="Home" />
      <div>
        <div className="homeBody">
            <Link to="/tasks">
              <button className="roomButton" type="button">
                Living Room
              </button>
            </Link>
            <Link to="/tasks">
              <button className="roomButton" type="button">
                Bathroom
              </button>
            </Link>
            <Link>
              <button className="roomButton" type="button">
                Add Room
              </button>
            </Link>
          </div>
          </div>
      <Footer />
    </>
  );
};

export default Home;
