import React from 'react';
import '../style/MessageContainer.css';
import { String } from 'core-js';
import { useState, useEffect } from 'react';

export const MessageContainer = ({ displayMessage }) => {
    const [checkMessage, setCheckMessage] = useState();

    const containerClassName = String(checkMessage).startsWith("RECEIVED.") ? "receivedMessageContainer" : "sendMessageContainer";
    const receivedMessageSliseIndicator = String(checkMessage).startsWith("RECEIVED.") ? checkMessage.slice(9) : checkMessage;

    useEffect(() => {
        if (displayMessage.slice(9) !== 'undefined') {
            setCheckMessage(displayMessage)
        }
    }, [displayMessage])

    return (
        <div className={containerClassName}
            style={{ display: checkMessage?.length ? 'block' : 'none' }}>
            {receivedMessageSliseIndicator}
        </div>
    );
}