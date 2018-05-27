const React = require('react');
const Router = require('react-router-dom').BrowserRouter;
const { Route } = require('react-router-dom');
const Header = require('../components/header');
const Poll = require('../poll/poll');
const Form = require('../components/form');
const Polls = require('../polls/polls');

const Main = () => {
  return (
    <Router>
      <div className="poll-application">
        <Header />
        <div className="poll-wrapper">
          <Route exact path="/" component={Form} />
          <Route exact path="/polls" component={Polls} />
          <Route path="/polls/:id" component={Poll} />
        </div>
      </div>
    </Router>
  );
};

module.exports = Main;
