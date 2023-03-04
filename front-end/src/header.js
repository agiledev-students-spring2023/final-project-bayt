import { Link } from 'react-router-dom';
import logo from './logo.png'
import "./header.css"


function Header() {
    return (
        <div className="container">
            <header className="header">
                <nav className="navbar">
                    <img src={logo} className="logo" alt="logo" />
                    Sticky Header
                    <ul className="nav-links">
                        <li className="nav-item">
                            <Link to="/finances">Finances</Link>
                        </li>
                    </ul>
                </nav>
            </header>
        </div>
    );
}

export default Header;