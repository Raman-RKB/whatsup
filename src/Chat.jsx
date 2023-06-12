import React from 'react';
import './App.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchSendmessage } from './ApiService'

function Chat() {
  const [textMessage, setTextMessage] = useState();
  const navigate = useNavigate();

  function textInsert(event) {
    const target = event.target.value;
    setTextMessage(target);
  }

  function sendMessage() {
    textMessage ?
      fetchSendmessage(textMessage)
        .then(response => {
          console.log(response)
        })
        .catch(error => {
          console.error(error)
        })
      :
      alert('введите текст сообщения');
  }

  useEffect(() => {
    if (!localStorage.getItem('idInstance')) {
      navigate('/login');
    } else if (!localStorage.getItem('phoneNumber')) {
      navigate('/create-chat');
    }
  }, [])

  return (
    <div className="container">
      <div className="chat">
        <h2>WhatsApp Chat</h2>

        <div className="messages">
          <ul id="message-list"></ul>
        </div>
        <form>
          <label htmlFor="message">Message:</label>
          <input type="text" id="message" name="message" onChange={textInsert} required />
          <button type="submit" id="send-message" onClick={sendMessage}>Send</button>
        </form>
      </div>
    </div>
  );
}

export default Chat;