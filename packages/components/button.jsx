import React from 'react';
import '../core/main.scss'

function Button({className, type, name}) {
    return(
        <button
            className={className}
            type={type}
            name={name}
        >
        </button>
    );
}

export default Button;