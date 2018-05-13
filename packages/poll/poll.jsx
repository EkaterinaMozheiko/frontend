const React = require('react');
const createRequest = require('core/create-request');

class chosenPoll extends React.Component {
    constructor(props) {
        super(props);
        this.state = ( {
            poll: []
        });
    }

    componentDidMount() {
        createRequest('fetchPoll').then((response) => {
            this.setState({ poll: response.data || [] });
            console.log(this.state.title);
        });
    };

    render() {
        return (
            <div>
                <h1>{this.state.poll.title}</h1>
            </div>
        )
    }
}

export default chosenPoll;