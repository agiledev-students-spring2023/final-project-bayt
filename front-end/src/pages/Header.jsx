import React from "react";
import "../index.css";
import "../css/Header.css";
import logo from "./logo.png";
import { Link } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";

const Header = ({ title }) => {
  return (
    <header className="header">
        <div className="headerLogo">
          <img src={logo} alt="Bayt Logo" />
        </div>
        <div className="houseName">
          <div className="houseName">{title}</div>
        </div>
        <div className="profile">
          <IconButton component={Link} to="/profile">
            <AccountCircle style={{ fontSize: 60 }} />
          </IconButton>
        </div>
    </header>
  );
};

export default Header;
