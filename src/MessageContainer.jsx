import React from 'react';
import './App.css';
import { String } from 'core-js';

function MessageContainer({ displayMessage }) {

    return (
        <div className={String(displayMessage).startsWith("RECEIVED.") ? "receivedMessageContainer" : "sendMessageContainer"}
            style={{ display: displayMessage.length ? 'block' : 'none' }}>
            {String(displayMessage).startsWith("RECEIVED.") ? displayMessage.slice(9) : displayMessage}
        </div>
    );
}

export default MessageContainer;