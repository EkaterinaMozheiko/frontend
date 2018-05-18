const React = require('react');
import Input from './input';
import Button from './button';
const { div } = require('react-dom');
const createRequest = require('core/create-request');
const { responseStatuses } = require('core/constants');

class Form extends React.Component {

    constructor(props) {

        super(props);
        this.state = ( {
            min: 2,
            max: 10,
            inputCount: 2,
            isFilled: false,
            enabled: false
        });

        this.addInput = this.addInput.bind(this);
        this.addMoreInputs = this.addMoreInputs.bind(this);
        this.removeInputs = this.removeInputs.bind(this);
        this.sendPoll = this.sendPoll.bind(this);
        this.addPoll = this.addPoll.bind(this);
        this.handleChange = this.handleChange.bind(this);

        this.optionList =[];
        this.inputTitleElement = null;
    }

    sendPoll(event) {
        event.preventDefault();

        this.inputTitleElement.input.className = this.state.isFilled ? "input input_width-500" : "input input_width-500 input_red";

        let poll = {};
        poll.title = this.inputTitleElement.getValue();
        poll.options = [];

        if (!this.optionList) {
            return;
        }

        console.log(this.optionList);

        this.optionList.map(option => {
            poll.options.push(option.getValue());
        });
        this.addPoll(poll);


    }

    addPoll(poll) {
        console.log(this.optionList);
        createRequest('createPoll', {}, poll).then((response) => {
            if (response.status === responseStatuses.OK) {

                //let titleInput = this.inputTitleElement.getValue();
                //titleInput = '';


                //this.optionList.map(option => {
                 //       console.log(option.getValue());
                        //let optionInput = option.getValue();
                        //optionInput = '';
                //});

            } else {
                console.log("NOT OK");
            }
        });
        this.optionList.length = 0;
        //console.log(this.optionList);

    }

    handleChange() {
        if(!this.inputTitleElement.getValue()) {
            this.setState({isFilled: false});
            return;
        }
        this.setState({isFilled: true});
    }

    render() {
        this.optionList.length = 0;
        return (
            <form className="main-wrapper" onSubmit= {this.sendPoll}>
                <label className="main-title">New Poll</label>
                <Input className="input input_width-500" name="question" type="text" placeholder="Type your question here..."
                       ref={(c) => { this.inputTitleElement = c; }} onChange={this.handleChange} />
                {this.getInputs()}
                <div className="button-wrapper">
                    <Button className="button" type="button" value="+ Add option" onClick={this.addMoreInputs}/>
                    <Button className="button" type="button" value="- Delete option" onClick={this.removeInputs}/>
                    <Button className="button" type="submit" value="Create Poll" />
                </div>

            </form>
        );
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
}

module.exports = Form;

