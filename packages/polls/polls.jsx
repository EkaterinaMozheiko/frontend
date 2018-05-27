const React = require('react');
const Button = require('../components/button');
const createRequest = require('core/create-request');
const { Link } = require('react-router-dom');
const { responseStatus } = require('core/constants');

class Polls extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({ polls: [] });

    this.deletePoll = this.deletePoll.bind(this);
  }

  componentDidMount() {
    createRequest('fetchPolls').then((response) => {
      if (response.status === responseStatus.OK) {
        this.setState({ polls: response.data || [] });
      }
    });
  }

  deletePoll(id) {
    createRequest('deletePoll', { id }).then((response) => {
      if ((response.status === responseStatus.OK)) {
        const { polls } = this.state;
        const filteredPoll = polls.filter((poll) => {
          return poll.id !== id;
        });
        this.setState({ polls: filteredPoll });
      }
    });
  }

  render() {
    const { polls } = this.state;
    return (
      <div className="main-wrapper main-wrapper_small">
        <h2 className="main-title">
          All created polls:
        </h2>
        <ul className="poll-list">
          {polls.map((poll) => (
            <li className="polls__item" key={poll.id}>
              <Button className="button button__delete" type="button" onClick={this.deletePoll.bind(null, poll.id)} />
              <Link className="link" to={`/polls/${poll.id}`}>{poll.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

module.exports = Polls;
