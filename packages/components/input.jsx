import React from 'react';

class Input extends React.Component {
    getValue() {
        return this.input.value;
    }
    render() {
        return (
            <input
                className={this.props.className}
                type="text"
                placeholder={this.props.placeholder}
                value={this.props.value}
                ref={(el) => { this.input = el; }}
                onChange={this.props.onChange}
            />
        )
    }
}

export default Input;