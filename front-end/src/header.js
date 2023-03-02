import logo from './logo.png'
import React from "react";
import "./header.css";

function Header() {
    return (
        <div className="container">
            <header className="header">
            <img src={logo} className="logo" alt="logo" />
                Sticky Header
            </header>
        </div>
    );
}

export default Header;