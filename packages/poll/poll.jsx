const React = require('react');
const createRequest = require('core/create-request');

class chosenPoll extends React.Component {
    constructor(props) {
        super(props);
        this.state = ( {
            poll: {}
        });
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
                    <li key={i++}>{option}</li>
            );
        }
    }


    render() {
        return (
            <div>
                <h2>{this.state.poll.title}</h2>
                <ul>
                    {this.renderOptions()}
                </ul>
            </div>
        )
    }
}

export default chosenPoll;