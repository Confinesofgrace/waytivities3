import './Navbar.css';
import { BsSearch } from "react-icons/bs";
import { NavLink } from 'react-router-dom';
import { useState } from 'react';

import Logo from '../assets/Waytivities-Logo/logo.png';
import { useAuth } from '../Components/AuthContext';

import { FaCartShopping } from "react-icons/fa6";


function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const closeMenu = () => setIsMenuOpen(false);

    const { user, logout } = useAuth();

    const handleLogout = async () => {
        try {
            await logout();
            closeMenu();
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    const AuthButtons = () => {
        return user ? (
            <button id="logout-btn" onClick={handleLogout}>
            Log Out
            </button>
        ) : (
            <>
            <NavLink to='/login' onClick={closeMenu}>
                <button id="login-btn">Log In</button>
            </NavLink>
            <NavLink to='/signup' onClick={closeMenu}>
                <button id="signup-btn">Sign Up</button>
            </NavLink>
            </>
        );
    };




    return (
        <div>
            <nav>
                <div id="nav-left">
                    <NavLink to='/' onClick={closeMenu}>

                        <div>

                            <div style={{
                                width:'50px',
                                height: '50px',
                            }} >
                            <img src={Logo} alt='Waytivities Logo' style={{
                                width:'100%',
                                height:'100%',
                                objectFit:'scale-down'}} />
                            </div>

                            {/* <p>Waytivities</p> */}


                        </div>
                        
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

                    { 
                        /*  
                            <div id="navs">
                                <NavLink to='/admin' activeclassname="active" onClick={closeMenu}>
                                Admin
                                <hr id='tab-hr'/>
                                </NavLink>
                            </div>
                        */
                    }

                    {   /*
                        <div id="navs">
                            <NavLink to='/adminpage' activeclassname="active" onClick={closeMenu}>
                            Admin
                            <hr id='tab-hr'/>
                            </NavLink>
                        </div>
                        */
                    }

                    <div id="navs">
                        <NavLink to='/cart' activeclassname="active" onClick={closeMenu}>
                        <span style={{display:'flex', alignItems:'center'}}>
                            <p>Cart</p> <FaCartShopping/>
                        </span>
                        

                        <hr id='tab-hr'/>
                        </NavLink>
                    </div>


                    {/* Show login/signup buttons only when mobile menu is open */}

                    {isMenuOpen && (
                        <div id="auth-buttons-mobile">
                            <AuthButtons />
                        </div>
                    )} 

                </div>

                
                <div id="nav-right">
                    {/* Desktop-only buttons */}
                    <AuthButtons/>

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
