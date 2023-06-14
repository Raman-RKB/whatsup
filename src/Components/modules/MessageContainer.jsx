import React from 'react';
import './style/MessageContainer.css';
import { String } from 'core-js';
import { useState, useEffect } from 'react';

function MessageContainer({ displayMessage }) {
    const [checkMessage, setCheckMessage] = useState();

    useEffect(() => {
        if (displayMessage.slice(9) !== 'undefined') {
            setCheckMessage(displayMessage)
        }
    }, [displayMessage])

    return (
        <div className={String(checkMessage).startsWith("RECEIVED.") ? "receivedMessageContainer" : "sendMessageContainer"}
            style={{ display: checkMessage?.length ? 'block' : 'none' }}>
            {String(checkMessage).startsWith("RECEIVED.") ? checkMessage.slice(9) : checkMessage}
        </div>
    );
}

export default MessageContainer;