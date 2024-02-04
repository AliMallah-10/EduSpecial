import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightToBracket } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
    const location = useLocation();
    const hideHeader = ['/signin', '/signup', '/reset-password', '/emailVerify'].includes(location.pathname);

    if (hideHeader) {
        return null; // Hide header if on sign-in, sign-up, reset password, or email verification page
    }

    return (
        <header className="edu-header p-6 text-white" style={{ backgroundImage: 'linear-gradient(#43cec6, #162c5a)', boxShadow: '0 4px 6px -1px rgba(255, 255, 255, 0.1), 0 2px 4px -1px rgba(255, 255, 255, 0.06)', height: '100%' }}>
            <div className="container mx-auto flex items-center justify-between">
                <img src={require("../../Assets/images/logo.png")} style={{ width: '80px', height: '80px', borderTopLeftRadius: '20px', borderBottomRightRadius: '20px', overflow: 'hidden' }} alt="Description" />
                <nav className="hidden md:flex items-center space-x-6">
                    <ul className="flex space-x-4">
                        <li className="hover:shadow-gold">
                            <Link to="/" className="text-lg hover:text-yellow-500 font-bold transition duration-300 transform hover:scale-105">Home</Link>
                        </li>
                        <li className="hover:shadow-gold">
                            <Link to="/programs" className="text-lg hover:text-yellow-500 font-bold transition duration-300 transform hover:scale-105">Programs</Link>
                        </li>
                        <li className="hover:shadow-gold">
                            <Link to="/events" className="text-lg hover:text-yellow-500 font-bold transition duration-300 transform hover:scale-105">Events</Link>
                        </li>
                        <li className="hover:shadow-gold">
                            <Link to="/contact-us" className="text-lg hover:text-yellow-500 font-bold transition duration-300 transform hover:scale-105">Contact Us</Link>
                        </li>
                        <li className="hover:shadow-gold">
                            <Link to="/about" className="text-lg hover:text-yellow-500 font-bold transition duration-300 transform hover:scale-105">About</Link>
                        </li>
                    </ul>
                </nav>
                <div className="flex items-center space-x-6">
                    <button className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition duration-300 transform hover:scale-105">Donate</button>
                    <Link to="/signin" className="text-lg hover:text-yellow-500 font-bold transition duration-300 transform hover:scale-105">
                        <FontAwesomeIcon icon={faArrowRightToBracket} />
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default Header;
