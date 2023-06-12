import React from 'react';
import './App.css';
// import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CreateChat() {
    const navigate = useNavigate();

    function insertPhoneNumber(event) {
        const target = event.target.value;
        localStorage.setItem('phoneNumber', target);
    }

    function createChatClick() {
        if (localStorage.getItem('phoneNumber')) {
            navigate('/');
        }
    }

    return (
        <div className="container">
            <div className="chat">
                <form>
                    <label htmlFor="recipient">Recipient Phone Number:</label>
                    <input type="tel"
                        id="recipient"
                        name="recipient"
                        required
                        onChange={insertPhoneNumber} />
                    <button type="button" id="create-chat" onClick={createChatClick}>Create Chat</button>
                </form>
            </div>
        </div>
    );
}

export default CreateChat;