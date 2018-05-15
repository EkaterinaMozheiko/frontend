import chosenPoll from "../poll/poll";

const React = require('react');
const { div } = require('react-dom');
const createRequest = require('core/create-request');
const Router = require('react-router-dom').BrowserRouter;
import { Link, Route, Switch } from 'react-router-dom'

class Polls extends React.Component {
    constructor(props) {

        super(props);
        this.state = ( {
            polls: []
        });
    }

    componentDidMount() {
        createRequest('fetchPolls').then((response) => {
            this.setState({ polls: response.data || [] });
        });
    };

    render() {
        return (
            <div className="polls">
                <h2 className="polls__header">
                    All created polls:
                </h2>
                <ul>
                    {this.state.polls.map(poll =>
                        <li className="polls__item" key={poll.id}>
                            <Link to={`/polls/${poll.id}`} style={{ textDecoration: 'none' }}>{poll.title}</Link>
                        </li>
                    )}
                </ul>
            </div>
        );
    }
}

export default Polls;