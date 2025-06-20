import './Navbar.css';
import { BsSearch } from "react-icons/bs";
import { NavLink } from 'react-router-dom';
import { useState } from 'react';

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const closeMenu = () => setIsMenuOpen(false);

    return (
        <div>
            <nav>
                <div id="nav-left">
                    <NavLink to='/' onClick={closeMenu}>
                        <p>Waytivities</p>
                    </NavLink>
                </div>

                <div id="nav-center" className= {isMenuOpen ? 'mobile-show' : ''}>
                    <div id="navs">
                        <NavLink to='/' exact="true" activeclassname="active" onClick={closeMenu}>
                        Home
                        <hr id='tab-hr'/>
                        </NavLink>
                    </div>

                    <div id="navs">
                        <NavLink to='/books' activeclassname="active" onClick={closeMenu}>
                        Books
                        <hr id='tab-hr'/>
                        </NavLink>
                    </div>

                    <div id="navs">
                        <NavLink to='/about' activeclassname="active" onClick={closeMenu}>
                        About Us
                        <hr id='tab-hr'/>
                        </NavLink>
                    </div>

                    <div id="navs">
                        <NavLink to='/admin' activeclassname="active" onClick={closeMenu}>
                        Admin
                        <hr id='tab-hr'/>
                        </NavLink>
                    </div>

                        {/* Show login/signup buttons only when mobile menu is open */}
                        {isMenuOpen && (
                            <div className="mobile-auth-buttons">
                            <NavLink to='/login' onClick={closeMenu}>
                                <button id="login-btn">Log In</button>
                            </NavLink>
                            <NavLink to='/signup' onClick={closeMenu}>
                                <button id="signup-btn">Sign Up</button>
                            </NavLink>
                            </div>
                        )}
                    </div>

                <div id="nav-right">
                    {/* Desktop-only buttons */}
                    <NavLink to='/login' onClick={closeMenu}>
                        <button id="login-btn">Log In</button>
                    </NavLink>
                    <NavLink to='/signup' onClick={closeMenu}>
                        <button id="signup-btn">Sign Up</button>
                    </NavLink>
                    <div id="search-box">
                        <BsSearch color="whitesmoke" size={25} />
                        <input type="text" placeholder="Search..." />
                    </div>
                    <div id="hamburger-box" onClick={toggleMenu}>
                        <hr />
                        <hr />
                        <hr />
                    </div>
                </div>

            </nav>
            
            
            {isMenuOpen && <div className="backdrop" onClick={closeMenu}></div>}
        </div>
    );
}

export default Navbar;
