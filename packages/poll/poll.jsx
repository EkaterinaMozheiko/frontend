/* eslint-disable no-plusplus,react/destructuring-assignment,one-var,object-curly-newline */
const React = require('react');
const Button = require('../components/button');
const ShareButtons = require('../components/share-buttons');
const { Link } = require('react-router-dom');
const createRequest = require('core/create-request');
const { responseStatus } = require('core/constants');
const PropTypes = require('prop-types');

const API_HOST = 'http://localhost:3000';

class Poll extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      poll: {},
      message: '',
      selectedOption: '',
      showChart: false,
      isToggleOn: false,
      selectedId: 0,
    });

    this.sendVote = this.sendVote.bind(this);
    this.viewResults = this.viewResults.bind(this);
    this.showURL = this.showURL.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.URL = API_HOST + this.props.match.url;
    this.handleClick = this.handleClick.bind(this);
    this.hideMessage = this.hideMessage.bind(this);
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    createRequest('fetchPoll', { id }).then((response) => {
      this.setState({ poll: response.data || [] });
    });
  }

  handleOnChange(event) {
    this.setState({ selectedOption: event.target.value, selectedId: event.target.id });
  }

  handleClick() {
    const { showChart, isToggleOn } = this.state;
    this.setState({ showChart: !showChart });
    this.setState({ isToggleOn: !isToggleOn });
  }

  sendVote() {
    const { selectedOption, selectedId } = this.state;
    const { id } = this.props.match.params;
    const index = selectedId;

    if (!selectedOption) {
      this.setState({ message: 'Please choose one answer!' });
      this.hideMessage();
      return;
    }

    this.setState({ message: 'Thanks for your vote.' });

    createRequest('updatePoll', { id, index });

    createRequest('fetchPoll', { id }).then((response) => {
      if (response.status === responseStatus.OK) {
        this.setState({ poll: response.data || [] });
      }
    });

    this.hideMessage();
  }

  viewResults() {
    const { options } = this.state.poll;
    const bars = [];
    let totalVotes = 0;

    if (!options) {
      return;
    }

    Object.keys(options).forEach((item) => {
      if (options[item].votes !== 0) {
        bars.push(
          <div key={item} className="bar-wrapper">
            <p>{options[item].option}</p>
            <div className="bar" style={{ width: options[item].votes * 20 }}>
              {options[item].votes}
            </div>
          </div>
        );
        totalVotes += options[item].votes;
      }
    });

    return (
      <div className="main-wrapper main-wrapper_chart">
        <div className="chart-title">{this.state.poll.title}</div>
        {bars}
        <div className="chart-title">{totalVotes} total votes.</div>
      </div>
    );
  }

  showURL() {
    const { id } = this.props.match.params;
    return (
      <div className="url-block">
        <Link className="url-link" to={`/polls/${id}`}>{this.URL}</Link>
      </div>
    );
  }

  hideMessage() {
    setTimeout(() => {
      this.setState({ message: '' });
    }, 1000);
  }

  renderOptions() {
    let result = [],
      i = 0;
    const { options } = this.state.poll;
    if (options) {
      result = options.map((item) => (
        <div key={i++} className="option-wrapper">
          <input
            className="radio"
            id={i}
            value={item.option}
            name="radio"
            type="radio"
            onChange={this.handleOnChange}
          />
          <label className="option-label" htmlFor={i}>{item.option}</label>
          <br />
        </div>
      ));
    }
    return result;
  }

  render() {
    return (
      <div>
        <div className="main-wrapper">
          <h2 className="main-title">{this.state.poll.title}</h2>

          <div className="poll-subtitle">Choose one answer</div>
          <div className="poll-list">
            {this.renderOptions()}
          </div>

          <Button className="button button__vote" type="submit" value="Vote" onClick={this.sendVote} />
          <Button
            className="button"
            type="submit"
            value={this.state.isToggleOn
              ? 'Hide results' : 'Show results'}
            onClick={this.handleClick}
          />
          <p className="vote-text">{this.state.message}</p>
        </div>
        <div className="share-wrapper">
          <h2 className="main-title main-title_small">Share this link</h2>
          {this.showURL()}
          <ShareButtons url={this.URL} />
        </div>
        <div className="chart-block" style={{ display: this.state.showChart ? 'block' : 'none' }}>
          {this.viewResults()}
        </div>
      </div>
    );
  }
}

Poll.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string.isRequired,
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }),
};

module.exports = Poll;
