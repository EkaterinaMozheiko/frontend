import React from 'react';

function Input({placeholder}) {
    return(
        <input
            className="input"
            type="text"
            placeholder={placeholder}
        />
    );
}

export default Input;