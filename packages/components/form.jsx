const React = require('react');
import Input from './input';
import Button from './button';
const createRequest = require('core/create-request');
const { responseStatuses } = require('core/constants');

class Form extends React.Component {

    constructor(props) {

        super(props);
        this.state = ( {
            min: 2,
            max: 10,
            inputCount: 2,
            isTitleFilled: false,
            isInputFilled: false
        });

        this.addInput = this.addInput.bind(this);
        this.addMoreInputs = this.addMoreInputs.bind(this);
        this.removeInputs = this.removeInputs.bind(this);
        this.sendPoll = this.sendPoll.bind(this);
        this.addPoll = this.addPoll.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);

        this.optionList =[];
        this.inputTitleElement = null;
    }

    sendPoll(event) {
        event.preventDefault();

        if (!this.state.isTitleFilled) {
            this.inputTitleElement.input.className = "input input_width-500 input_red";
            return;
        }

        this.inputTitleElement.input.className = "input input_width-500";

        let poll = {};
        poll.title = this.inputTitleElement.getValue();
        poll.options = [];

        this.optionList.map(option => {
            if(option !== null) {
                poll.options.push(option.getValue());
            }
        });
        console.log(poll);
        this.addPoll(poll);

    }

    addPoll(poll) {
        createRequest('createPoll', {}, poll).then((response) => {
            if (response.status === responseStatuses.OK) {
                this.inputTitleElement.input.value = '';
                console.log(this.optionList.length);
                this.optionList.map(option => {
                    if(option !== null) {
                        option.input.value = '';
                    }
                });

            } else {
                console.log("NOT OK");
            }
        });
    }

    handleTitleChange() {
        if(!this.inputTitleElement.getValue()) {
            this.setState({isTitleFilled: false});
            return;
        }
        this.setState({isTitleFilled: true});
    }

    addMoreInputs(){
        let inputCount = this.state.inputCount;
        if (inputCount < this.state.max) {
            this.setState({inputCount: inputCount + 1})
        }
    }

    removeInputs(){
        let inputCount = this.state.inputCount;
        if (inputCount > this.state.min) {
            this.setState({inputCount: inputCount - 1})
        }
    }

    addInput(i) {
        let placeholder = "Option " + ++i ;
        return(
            <Input key={i} className="input" placeholder={placeholder} ref={(c) => { this.optionList.push( c )} }/>
        )
    }

    getInputs() {
        let rows = [];
        let inputCount = this.state.inputCount;
        for (let i=0; i < inputCount; i++) {
            rows.push(this.addInput(i))
        }
        return rows;
    }

    render() {
        this.optionList.length = 0;
        return (
            <form className="main-wrapper" onSubmit= {this.sendPoll}>
                <label className="main-title">New Poll</label>
                <Input className="input input_width-500" name="question" type="text" placeholder="Type your question here..."
                       ref={(c) => { this.inputTitleElement = c; }} onChange={this.handleTitleChange} />
                {this.getInputs()}
                <div className="button-wrapper">
                    <Button className="button" type="button" value="+ Add option" onClick={this.addMoreInputs}/>
                    <Button className="button" type="button" value="- Delete option" onClick={this.removeInputs}/>
                    <Button className="button" type="submit" value="Create Poll" />
                </div>

            </form>
        );
    }
}

module.exports = Form;

