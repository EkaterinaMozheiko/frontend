import React from 'react';
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <div className="wrapper">
            <header className="header">
                <div className="header__title">Create Your Poll</div>
                <Link to="/">Home</Link>
                <Link to="/polls">View all polls</Link>
            </header>
        </div>
    );
};

export default Header;