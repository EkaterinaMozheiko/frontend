import chosenPoll from "./poll";
const Polls = require('../polls/polls').default;
const React = require('react');
import { Route, Switch } from 'react-router-dom'

const PollLink = () => (
    <Switch>
        <Route path='/polls/:id' component={chosenPoll}/>
    </Switch>
);

export default PollLink;