import React, { forwardRef } from 'react';
import '../style/MessageContainer.css';

export const Input = forwardRef(({ id, placeholder, type, handler }, ref) => {

    return (
        <input
            type={type}
            id={id}
            placeholder={placeholder}
            onChange={handler}
            ref={ref}
            required
        />
    );
});

export const Button = ({ type, handler, buttonName }) => {

    return (
        <button
            type={type}
            onClick={handler}
        >
            {buttonName}
        </button>
    );
};