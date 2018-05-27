/* eslint-disable no-plusplus,no-param-reassign */
const React = require('react');
const Input = require('./input');
const Button = require('./button');
const createRequest = require('core/create-request');
const { responseStatus } = require('core/constants');

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      min: 2,
      max: 10,
      inputCount: 2,
      isTitleFilled: false,
      className: 'input input_width-500',
    };

    this.addInput = this.addInput.bind(this);
    this.sendPoll = this.sendPoll.bind(this);
    this.addPoll = this.addPoll.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.clearValue = this.clearValue.bind(this);
    this.removeInput = this.changeInputCount.bind(this, -1);
    this.addMoreInput = this.changeInputCount.bind(this, 1);

    this.optionList = [];
    this.inputTitleElement = null;
  }

  getInputs() {
    const rows = [];
    const { inputCount } = this.state;

    for (let i = 0; i < inputCount; i++) {
      rows.push(this.addInput(i));
    }

    return rows;
  }

  addInput(i) {
    return (
      <Input
        key={i}
        className="input"
        placeholder={`Option ${++i}`}
        ref={(c) => {
          this.optionList.push(c);
        }}
      />
    );
  }

  changeInputCount(delta) {
    const { inputCount, min, max } = this.state;
    const newCount = inputCount + delta;
    if (newCount >= min && newCount <= max) {
      this.setState({ inputCount: newCount });
    }
  }

  handleTitleChange() {
    this.setState({ isTitleFilled: Boolean(this.inputTitleElement.getValue()) });
    const { isTitleFilled, className } = this.state;
    if (!isTitleFilled) {
      this.setState({ className: 'input input_width-500 input_red' });
      this.inputTitleElement.input.className = className;
      return;
    }

    this.setState({ className: 'input input_width-500' });
    this.inputTitleElement.input.className = className;
  }

  clearValue() {
    this.optionList.map((option) => {
      if (option === null) {
        return;
      }
      option.input.value = '';
    });
  }

  addPoll(poll) {
    createRequest('createPoll', {}, poll).then((response) => {
      if ((response.status === responseStatus.OK)) {
        this.inputTitleElement.input.value = '';
        this.clearValue(poll);
      }
    });
  }

  sendPoll(event) {
    event.preventDefault();

    const poll = {
      title: this.inputTitleElement.getValue(),
      options: [],
    };
    let index = 1;
    const { isTitleFilled, className } = this.state;

    if (!isTitleFilled) {
      this.setState({ className: 'input input_width-500 input_red' });
      this.inputTitleElement.input.className = className;
      return;
    }

    this.optionList.map((option) => {
      if (option === null) {
        return;
      }
      poll.options.push({
        index: String(index++),
        option: option.getValue(),
        votes: 0,
      });
    });

    this.addPoll(poll);
  }

  render() {
    this.optionList.length = 0;

    return (
      <form className="main-wrapper" onSubmit={this.sendPoll}>
        <label className="main-title">New Poll</label>
        <Input
          className="input input_width-500"
          name="question"
          type="text"
          placeholder="Type your question here..."
          ref={(c) => {
            this.inputTitleElement = c;
          }}
          onChange={this.handleTitleChange}
        />
        {this.getInputs()}
        <div className="button-wrapper">
          <Button className="button" type="button" value="+ Add option" onClick={this.addMoreInput} />
          <Button className="button" type="button" value="- Delete option" onClick={this.removeInput} />
          <Button className="button" type="submit" value="Create Poll" />
        </div>

      </form>
    );
  }
}

module.exports = Form;
