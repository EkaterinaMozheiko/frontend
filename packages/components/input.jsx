import React from 'react';

class Input extends React.Component {
    render() {
        return (
            <input
                className={this.props.className}
                type="text"
                placeholder={this.props.placeholder}
                value={this.props.value}
            />
        )
    }
}


/*

const Input = (props) => {
    return(
        <input
            className={props.className}
            type="text"
            placeholder={props.placeholder}
            value={props.value}
            //ref={props.link}
        />
    )
};
*/
export default Input;