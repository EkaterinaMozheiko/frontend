const React = require('react');
const { Link } = require('react-router-dom');
const logo = require('./img/logo.svg');

const Header = () => {
  return (
    <div className="wrapper">
      <header className="header">
        <img width="80" height="80" src={logo} />
        <div className="header__title">Create Your Poll</div>
        <Link className="link" to="/">Home</Link>
        <Link className="link" to="/polls">View all polls</Link>
      </header>
    </div>
  );
};

module.exports = Header;
