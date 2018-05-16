const React = require('react');
const Router = require('react-router-dom').BrowserRouter;
import { Route } from 'react-router-dom'
import Header from '../components/header';
import chosenPoll from "../poll/poll";
const Form = require('../components/form');
const Polls = require('../polls/polls').default;
const { div } = require('react-dom');

const Main = () => (
    <Router>
        <div className="poll-application">
            <Header/>
            <div className="poll-wrapper">
                    <Route exact path="/" component={Form} />
                    <Route exact path="/polls" component={Polls}/>
                    <Route path='/polls/:id' component={chosenPoll}/>
            </div>
        </div>
    </Router>
    );

module.exports = Main;