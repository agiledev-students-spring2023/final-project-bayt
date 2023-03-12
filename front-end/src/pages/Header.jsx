import React from 'react'

import '../css/Header.css'
import logo from '../logo.svg'

const Header = props => {
  
    return (
      <header className="header">
        <div className="headerLogo">
            <img src={logo} alt="Bayt Logo" />
        </div>
        <div className="houseName">
            Ravenclaw
        </div>
      </header>
    )
  }
  
  export default Header