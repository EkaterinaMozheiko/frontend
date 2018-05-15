import Poll from "../polls/polls";
const React = require('react');
const Router = require('react-router-dom').BrowserRouter;
import { Route, Switch } from 'react-router-dom'
import Header from '../components/header';
import chosenPoll from "../poll/poll";
import PollLink from "../poll/poll-link";
/*import Form from '../components/form'*/
const dynamicForm = require('../components/form');
const Polls = require('../polls/polls').default;
const { div } = require('react-dom');

const Main = () => (
    <Router>
        <div className="poll-application">
            <Header/>
            <div className="poll-wrapper">
                    <Route exact path="/" component={dynamicForm} />
                    <Route exact path="/polls" component={Polls}/>
                    <Route path='/polls/:id' component={chosenPoll}/>
            </div>
        </div>
    </Router>
    );

module.exports = Main;