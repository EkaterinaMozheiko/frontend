import React from 'react';

const Button = ({className, type, name, value}) => {
    return(
        <button
            className={className}
            type={type}
            name={name}
        >{value}
        </button>
    );
};

export default Button;