import React from 'react';
import './App.css';
import MessageContainer from "./MessageContainer";

import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchSendMessage, fetchReсeiveMessage, fetchDeleteReсeivedMessage } from './ApiService'

function Chat() {
  const [textMessage, setTextMessage] = useState();
  const [displayMessage, setDisplayMessage] = useState([]);
  const [receiptId, setReceiptId] = useState();
  const navigate = useNavigate();
  const inputRef = useRef();

  function textInsert(event) {
    const target = event.target.value;
    setTextMessage(target);
  }

  function sendMessage(event) {
    event.preventDefault()
    inputRef.current.value = '';
    inputRef.current.focus();
    textMessage ?
      fetchSendMessage(textMessage)
        .then(response => {
          setDisplayMessage(prevMessages => [...prevMessages, textMessage])
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

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchMessages();
    }, 5000);

    return () => clearInterval(intervalId);

    function fetchMessages() {
      fetchReсeiveMessage()
        .then(response => {
          if (!response) {
            return
          } else if (!response.body?.messageData) {
            fetchDeleteReсeivedMessage(response.receiptId);
          } else if (response.body?.messageData) {
            setDisplayMessage(prevMessages => [...prevMessages, `RECEIVED.${response.body?.messageData.textMessageData?.textMessage}`]);
            fetchDeleteReсeivedMessage(response.receiptId);
            setReceiptId(response.receiptId)
          } else if (response.body.senderData.sender === `${localStorage.getItem('phoneNumber')}@c.us`) {
            fetchDeleteReсeivedMessage(response.receiptId);
          }
        })

        .catch(error => {
          console.error(error)
        })
    }
  }, [receiptId])

  return (
    <div className="container">
      <div className="chat">
        <h2>WhatsApp Chat</h2>
        <div className="messages">
          <ul id="message-list"></ul>
        </div>
        <form>
          <div className="chatArea">
            {displayMessage.length > 0 ? (
              displayMessage.map((message, index) => (
                <MessageContainer
                  key={index}
                  displayMessage={message}
                />
              ))
            ) : (
              <MessageContainer displayMessage={displayMessage} />
            )}

          </div>
          <input type="text" placeholder="Введите сообщение" ref={inputRef} onChange={textInsert} required />
          <button type="submit" id="send-message" onClick={sendMessage}>Send</button>
        </form>
      </div>
    </div>
  );
}

export default Chat;