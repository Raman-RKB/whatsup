import React from 'react';
import './App.css';
import MessageContainer from "./MessageContainer";

import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchSendMessage, fetchReсeiveMessage, fetchDeleteReсeivedMessage } from './ApiService'

function fetchMessages(setDisplayMessage) {
  fetchReсeiveMessage()
    .then(response => {
      console.log(response);
      if (!response) {
        // setTimeout(fetchMessages, 5000);
        return
      } else if (!response.body?.messageData) {
        fetchDeleteReсeivedMessage(response.receiptId);
      } else if (response.body?.messageData) {
        fetchDeleteReсeivedMessage(response.receiptId);
        setDisplayMessage(prevMessages => [...prevMessages, `RECEIVED.${response.body?.messageData.extendedTextMessageData?.text}`]);
      }
      // setTimeout(fetchMessages, 5000);
    })
    .catch(error => {
      console.error(error)
    })
}

function Chat() {
  const [textMessage, setTextMessage] = useState();
  const [displayMessage, setDisplayMessage] = useState([]);
  // const [receiptId, setReceiptId] = useState();
  const navigate = useNavigate();
  const inputRef = useRef();

  console.log('mount');

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
        .then(setDisplayMessage(prevMessages => [...prevMessages, textMessage]))
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
    console.log('вызывается в useEffect еще раз');
    fetchMessages(setDisplayMessage);
  }, [])

  return (
    <div className="container">
      <div className="chat">
        <h2>WhatsApp Chat</h2>
        <div className="messages">
          <ul id="message-list"></ul>
        </div>
        <form>
          <div className="chatArea">
            {displayMessage.length > 1 ? (
              displayMessage.map((message) => (
                <MessageContainer
                  key={message.index}
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