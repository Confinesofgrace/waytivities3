import './Navbar.css';
import { BsSearch } from "react-icons/bs";
import { NavLink } from 'react-router-dom';

function Navbar() {
    return (
        <div>
            <nav>
                <div id="nav-left">
                    <NavLink to='/'>
                        <p>Waytivities</p>
                    </NavLink>
                </div>

                <div id="nav-center">
                    <div id="navs">
                        <NavLink to='/' exact activeClassName="active">
                            Home
                            <hr id='tab-hr'/>
                        </NavLink>
                    </div>

                    <div id="navs">
                        <NavLink to='/books' activeClassName="active">
                            Books
                            <hr id='tab-hr'/>
                        </NavLink>
                    </div>

                    <div id="navs">
                        <NavLink to='/about' activeClassName="active">
                            About Us
                            <hr id='tab-hr'/>
                        </NavLink>
                    </div>

                    <div id="navs">
                        <NavLink to='/admin' activeClassName="active">
                            Admin
                            <hr id='tab-hr'/>
                        </NavLink>
                    </div>
                </div>

                <div id="nav-right">
                    <NavLink to='/login'>
                        <button id="login-btn">Log In</button>
                    </NavLink>
                    <NavLink to='/signup'>
                        <button id="signup-btn">Sign Up</button>
                    </NavLink>
                    <div id="search-box">
                        <BsSearch color="whitesmoke" size={25} />
                        <input type="text" placeholder="Search..." />
                    </div>
                    <div id="hamburger-box">
                        <hr />
                        <hr />
                        <hr />
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;
