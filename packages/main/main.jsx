import Poll from "../polls/polls";
const React = require('react');
const Router = require('react-router-dom').BrowserRouter;
import { Route } from 'react-router-dom'
import Header from '../components/header';
import Form from '../components/form'

const { div } = require('react-dom');

const Main = () => (
    <Router>
        <div className="poll-application">
            <Header/>
            <div className="poll-wrapper">
                <Route exact path="/" component={Form} />
                <Route path="/polls" component={Poll} />
            </div>
        </div>
    </Router>
    );

module.exports = Main;