const React = require('react');
/*import Poll from 'polls/polls';*/
const createRequest = require('core/create-request.js');
/*const Messages = require('messages/messages');*/

class Polls extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tasks: [],
            activeFilter: visibilityFilters.ALL,
            isLoading: true,
            messages: [],
        };

        /*this.addTask = this.addTask.bind(this);
        this.toggleTask = this.toggleTask.bind(this);*/
    }

    componentDidMount() {
        createRequest('fetchPolls').then((response) => {
            this.setState({polls: response.data || [], isLoading: false, messages: response.messages});
            console.log(response.data);
        });
    }
}

module.exports = Polls;