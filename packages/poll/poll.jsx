import Button from '../components/button';
import ShareButtons from '../components/share-buttons';
import {Link} from 'react-router-dom'

const React = require('react');
const createRequest = require('core/create-request');


const API_HOST = 'http://localhost:3000';

class chosenPoll extends React.Component {
    constructor(props) {
        super(props);
        this.state = ( {
            poll: {},
            message: '',
            selectedOptions: {},
            selectedOption: "",
            showChart: false,
            isToggleOn: false
            //warningMessage: ''
        });

        this.sendVote = this.sendVote.bind(this);
        this.viewResults = this.viewResults.bind(this);
        this.showURL = this.showURL.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
        this.URL = API_HOST + this.props.match.url;
        this.handleClick = this.handleClick.bind(this);
        this.refreshResults = this.refreshResults.bind(this);
        this.hideMessage = this.hideMessage.bind(this);
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        createRequest('fetchPoll', {id}).then((response) => {
            this.setState({ poll: response.data || [] });
        });

    };

    handleOnChange(event) {
        this.setState({ selectedOption: event.target.value });
    }

    handleClick() {
        this.setState({showChart: !this.state.showChart});
        this.setState({isToggleOn: !this.state.isToggleOn});
    }

    renderOptions() {
        let i = 0;
        if (this.state.poll.options) {
            return this.state.poll.options.map(option =>
                <div key ={i++} className="option-wrapper">
                    <input className="radio" id={i} value={option} name="radio" type="radio" onChange={this.handleOnChange}/>
                    <label className="option-label" htmlFor={i}>{option}</label>
                    <br/>
                </div>
            );
        }
    }

    sendVote() {
        if(this.state.selectedOption === '') {
            this.setState({ message: "Please choose one answer!" });
            this.hideMessage();
            return;
        }

        this.setState({ message: "Thanks for your vote." });

        if (!this.state.selectedOptions[this.state.selectedOption]) {
            this.state.selectedOptions[this.state.selectedOption] = 1;
        }
        else {
            this.state.selectedOptions[this.state.selectedOption] +=1;
        }

        this.hideMessage();

    }

    viewResults() {
        const data = this.state.selectedOptions;
        let bars = [];
        let totalVotes = 0;
        if (!data) {
            return;
        }

        for (let item in data) {
            if (data.hasOwnProperty(item)) {
                bars.push(
                    <div key={item} className="bar-wrapper">

                            <p>{item}</p>

                        <div className="bar" style={{width: data[item] * 20}}>
                            {data[item]}
                        </div>
                    </div>
                );
                totalVotes += data[item];
            }
        }
        return (
            <div className="main-wrapper main-wrapper_chart">
                <div className="chart-title">{this.state.poll.title}</div>
                {bars}
                <div className="chart-title">{totalVotes} total votes.</div>
                <Button className="button" type="submit" value="Refresh results" onClick={this.refreshResults}/>
            </div>
        )
    }

    showURL() {
        const id = this.props.match.params.id;
        return (
            <div className="url-block">
                <Link className="url-link" to={`/polls/${id}`}>{this.URL}</Link>
            </div>
        )
    }

    hideMessage() {
        setTimeout(function() {
            this.setState({message: ''});
        }.bind(this), 1000);
    }

    refreshResults() {
        this.state.selectedOptions = {};
        for (const prop of Object.getOwnPropertyNames(this.state.selectedOptions)) {
            delete this.state.selectedOptions[prop];
        }
        console.log(this.state.selectedOptions);
        this.setState({showChart: false});
        this.setState({isToggleOn: false});
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
                    <Button className="button button__vote" type="submit" value="Vote" onClick={this.sendVote}/>
                    <Button className="button" type="submit" value={this.state.isToggleOn ? 'Hide results' : 'Show results'}
                            onClick={this.handleClick}/>
                    <p className="vote-text">{this.state.message}</p>
                </div>
                <div className="share-wrapper">
                    <h2 className="main-title main-title_small">Share this link</h2>

                    {this.showURL()}
                    <ShareButtons url={this.URL}/>

                </div>
                <div className="chart-block" style={{display: this.state.showChart ? 'block' : 'none' }}>

                    {this.viewResults()}

                </div>
            </div>
        )
    }
}

export default chosenPoll;