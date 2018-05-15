import React from 'react';

const Input = (props) => {
    return(
        <input
            className={props.className}
            type="text"
            placeholder={props.placeholder}
            value={props.value}
            ref={props.ref}
        />
    );
};

export default Input;