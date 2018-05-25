import React from 'react';
import Input from './input';
import Button from './button';
import createRequest from 'core/create-request';
import responseStatuses from 'core/constants';

class Form extends React.Component {

    constructor(props) {

        super(props);
        this.state = {
            min: 2,
            max: 10,
            inputCount: 2,
            isTitleFilled: false,
            className: 'input input_width-500 input_red'
        };

        this.addInput = this.addInput.bind(this);
        this.sendPoll = this.sendPoll.bind(this);
        this.addPoll = this.addPoll.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.clearValue = this.clearValue.bind(this);
        this.removeInput = this.changeInputCount.bind(this, -1);
        this.addMoreInput = this.changeInputCount.bind(this, 1);

        this.optionList =[];
        this.inputTitleElement = null;
    }

    sendPoll(event) {
        event.preventDefault();
        if (!this.state.isTitleFilled) {
            this.setState({className: "input input_width-500 input_red"});
            this.inputTitleElement.input.className = this.state.className;
            return;
        }

        if(!this.state.isTitleFilled) {
            return;
        }

        const poll = {
            title: this.inputTitleElement.getValue(),
            options: []
        };

        let index = 1;

        this.optionList.map(option => {
            if(option !== null) {
                poll.options.push({
                    index: String(index++),
                    option: option.getValue(),
                    votes: 0
                });
            }
        });
        //console.log(poll);
        this.addPoll(poll);
    }

    addPoll(poll) {
        createRequest('createPoll', {}, poll).then((response) => {
            if ((response.status === responseStatuses.OK)) {
                this.inputTitleElement.input.value = '';
                console.log(this.optionList.length);
                this.clearValue(poll);

            } else {
                console.log("NOT OK");
            }
        });
    }

    clearValue() {
        this.optionList.map(option => {
            if(option !== null) {
                option.input.value = '';
            }
        });
    }

    handleTitleChange() {
        this.setState({
            isTitleFilled: Boolean(this.inputTitleElement.getValue())
        });

        if (!this.state.isTitleFilled) {
            this.setState({className: "input input_width-500 input_red"});
            this.inputTitleElement.input.className = this.state.className;
            return;
        }

        this.setState({className: "input input_width-500"});
        this.inputTitleElement.input.className = this.state.className;
    }

    changeInputCount(delta) {
        const { inputCount, min, max } = this.state;
        const newCount = inputCount + delta;
        if (newCount >= min && newCount <= max) {
            this.setState({ inputCount: newCount });
        }
    }

    addInput(i) {
        return(
            <Input key={i} className="input" placeholder={`Option ${++i}`} ref={(c) => { this.optionList.push( c )} }/>
        )
    }

    getInputs() {
        let rows = [];
        const { inputCount} = this.state;
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
                    <Button className="button" type="button" value="+ Add option" onClick={this.addMoreInput}/>
                    <Button className="button" type="button" value="- Delete option" onClick={this.removeInput}/>
                    <Button className="button" type="submit" value="Create Poll" />
                </div>

            </form>
        );
    }
}

export default Form;