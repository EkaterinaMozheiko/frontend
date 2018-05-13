const React = require('react');
const { div } = require('react-dom');
const createRequest = require('core/create-request');

class Poll extends React.Component {

    constructor(props) {

        super(props);
        this.state = ( {
            polls: []
        });
    }

    componentDidMount() {
        createRequest('fetchPolls').then((response) => {
            this.setState({ polls: response.data || [] });
            console.log('Response = ' + this.state.polls);
        });
    };

    render() {
        return (
            <div className="polls-list">
                <h2 className="polls-header">
                    All created polls:
                </h2>
                {this.state.polls}
            </div>
        );
    }
}

export default Poll;