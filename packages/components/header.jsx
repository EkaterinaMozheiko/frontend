import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div className="wrapper">
            <header className="header">
                <img width="80" height="80" src={require('./img/logo.svg')}></img>
                <div className="header__title">Create Your Poll</div>
                <Link className="link" to="/" >Home</Link>
                <Link className="link" to="/polls">View all polls</Link>
            </header>
        </div>
    );
};

export default Header;