import React from 'react';
import { Link } from "react-router-dom";

import '../css/Header.css'

function Header(props) {
    return (
        <div className='headerContainer'>
            <div className='logoBox'>
                <p>LOGO</p>
            </div>

            <div className='roomNameBox'>
                <p>{props.roomName ? props.roomName : 'Default Room'}</p>
            </div>

            <Link to='/profile'>
                <div className='profileBox'>
                    <p>Profile</p>
                </div>
            </Link>
        </div>
    )
}

export default Header;