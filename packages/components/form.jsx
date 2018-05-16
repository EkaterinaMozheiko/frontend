const React = require('react');
import Input from './input';
import Button from './button';
const { div } = require('react-dom');

class Form extends React.Component {

    constructor(props) {

        super(props);
        this.state = ( {
            min: 2,
            max: 10,
            inputCount: 2,
            question: '',
            options: []

        });

        this.addInput = this.addInput.bind(this);
        this.addMoreInputs = this.addMoreInputs.bind(this);
        this.removeInputs = this.removeInputs.bind(this);
        this.sendPoll = this.sendPoll.bind(this);

        this.optionList =[];
        this.inputTitleElement = null;
    }

    sendPoll(event) {
        event.preventDefault();

       /* if (!this.inputTitleElement.value) {
            alert("type your question!");
            return;
        }
*/
        //let poll = {};
        //poll.title = this.inputTitleElement.value;
        //poll.options = [];


        //this.optionList.map(optionInput => poll.options.push(optionInput.value));
        console.log("Title = " + this.inputTitleElement.value);
        // console.log("Title = " + inputValue);
        //console.log("Title_poll = " + poll.title);
        //addPoll(inputElement.value);
       // inputElement.value = '';
    };

    render() {

        this.optionList.length = 0;
        return (
            <form className="main-wrapper" onSubmit= {this.sendPoll}>
                <label className="main-title">New Poll</label>
                <Input className="input input_width-500" placeholder="Type your question here..." ref={(el) => { this.inputTitleElement = el; }}/>
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
            <Input key={i} className="input" placeholder={placeholder}/>
        )
        //ref={(el) => { this.optionList.push(el)}}
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

