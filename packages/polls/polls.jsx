import React from 'react';
import Button from '../components/button';
import createRequest from 'core/create-request';
import { Link } from 'react-router-dom';

class Polls extends React.Component {
    constructor(props) {

        super(props);
        this.state = ( {
            polls: []
        });

        this.deletePoll = this.deletePoll.bind(this);
    }

    componentDidMount() {
        createRequest('fetchPolls').then((response) => {
            this.setState({ polls: response.data || [] });
        });
    };

    deletePoll(id) {
        createRequest('deletePoll', {id}).then((response) => {
            let filteredPoll = this.state.polls.filter((poll) => {return poll.id !== id});
            this.setState({ polls: filteredPoll });
        });
    }

    render() {
        return (
            <div className="main-wrapper main-wrapper_small">
                <h2 className="main-title">
                    All created polls:
                </h2>
                <ul className="poll-list">
                    {this.state.polls.map(poll =>
                        <li className="polls__item" key={poll.id}>
                            <Button className="button button__delete" onClick={this.deletePoll.bind(this, poll.id)}/>
                            <Link className="link" to={`/polls/${poll.id}`}>{poll.title}</Link>
                        </li>
                    )}
                </ul>
            </div>
        );
    }
}

export default Polls;