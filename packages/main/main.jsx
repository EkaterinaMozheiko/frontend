import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from '../components/header';
import chosenPoll from '../poll/poll';
import Form from '../components/form';
import Polls from '../polls/polls';

const Main = () => {
    return (
        <Router>
            <div className="poll-application">
                <Header/>
                <div className="poll-wrapper">
                    <Route exact path="/" component={Form}/>
                    <Route exact path="/polls" component={Polls}/>
                    <Route path='/polls/:id' component={chosenPoll}/>
                </div>
            </div>
        </Router>
    );
};

export default Main;
