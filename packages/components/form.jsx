const React = require('react');
import Input from './input';
import Button from './button';
const { div } = require('react-dom');

class dynamicForm extends React.Component {

    constructor(props) {

        super(props);
        this.state = ( {
            min: 3,
            max: 10,
            inputCount:3,
            question: '',
            options: []
        });

        this.addInput = this.addInput.bind(this);
        this.addMoreInputs = this.addMoreInputs.bind(this);
        this.removeInputs = this.removeInputs.bind(this);
    }

    render() {
        return (
            <div className="form-wrapper">
                <Input className="input input_width-500" placeholder="Question" value={this.state.title}/>
                {this.getInputs()}
                <div className="button-wrapper">
                    <Button className="button" type="button" value="+ Add option" onClick={this.addMoreInputs}/>
                    <Button className="button" type="button" value="- Delete option" onClick={this.removeInputs}/>
                </div>
                <Button className="button button_width-500" type="submit" value="Create" onClick={this.sendPoll}/>
            </div>
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
    }

    getInputs() {
        let rows = [];
        let inputCount = this.state.inputCount;
         for (let i=0; i < inputCount; i++) {
            rows.push(this.addInput(i))
        }
        return rows;
    }

    sendPoll() {

    }

}

module.exports = dynamicForm;

