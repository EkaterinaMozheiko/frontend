import Button from '../components/button';
const React = require('react');
const createRequest = require('core/create-request');
import { Link } from 'react-router-dom'
import {
    FacebookShareButton,
    TwitterShareButton,
    TelegramShareButton,
    VKShareButton,
    GooglePlusShareButton,

    FacebookIcon,
    TwitterIcon,
    TelegramIcon,
    VKIcon,
    GooglePlusIcon
} from 'react-share';

const API_HOST = 'http://localhost:3000';

class chosenPoll extends React.Component {
    constructor(props) {
        super(props);
        this.state = ( {
            poll: {},
            message: ''
        });

        this.sendVote = this.sendVote.bind(this);
        this.viewResults = this.viewResults.bind(this);
        this.showURL = this.showURL.bind(this);
        this.URL = API_HOST + this.props.match.url;
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        createRequest('fetchPoll', {id}).then((response) => {
            this.setState({ poll: response.data || [] });
        });

    };

    renderOptions() {
        let i = 0;
        if (this.state.poll.options) {
            return this.state.poll.options.map(option =>
                <div key ={i++} className="option-wrapper">
                    <input className="radio" id={i} name="radio" type="radio"/>
                    <label className="option-label" htmlFor={i}>{option}</label>
                    <br/>
                </div>
            );
        }
    }

    sendVote() {
        this.setState({ message: "Thanks for your vote." });
        /*return(
            <p className="vote-text">Thanks for your vote.</p>
        );*/
        // No answer selected.

        //poll.options[] = 1;

    }

    viewResults() {

    }

    showURL() {
        const id = this.props.match.params.id;
        return (
            <div className="url-block">
                <Link className="url-link" to={`/polls/${id}`}>{this.URL}</Link>
            </div>
        )
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
                    <Button className="button" type="submit" value="View Results" onClick={this.viewResults}/>
                    <p className="vote-text">{this.state.message}</p>
                </div>
                <div className="share-wrapper">
                    <h2 className="main-title main-title_small">Share this link</h2>

                    {this.showURL()}

                    <div className="share-button-wrapper">
                        <FacebookShareButton url={this.URL} className="share-button">
                            <FacebookIcon size={32} round />
                        </FacebookShareButton>

                        <TwitterShareButton url={this.URL} className="share-button">
                            <TwitterIcon size={32} round />
                        </TwitterShareButton>

                        <TelegramShareButton url={this.URL} className="share-button">
                            <TelegramIcon size={32} round />
                        </TelegramShareButton>

                        <VKShareButton url={this.URL} className="share-button">
                            <VKIcon size={32} round />
                        </VKShareButton>

                        <GooglePlusShareButton url={this.URL} className="share-button">
                            <GooglePlusIcon size={32} round />
                        </GooglePlusShareButton>
                    </div>
                </div>
            </div>

        )
    }
}

export default chosenPoll;