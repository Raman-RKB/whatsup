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

  function fetchMessages() {
    fetchReсeiveMessage()
      .then(response => {
        console.log(response);
        if (response === null) {
          return
        } else if (receiptId === response.receiptId) {
          return
        } else if (response.body?.messageData && receiptId !== response.receiptId) {
          setDisplayMessage(prevMessages => [...prevMessages, `RECEIVED.${response.body?.messageData.extendedTextMessageData?.text}`]);
          fetchDeleteReсeivedMessage(response.receiptId);
        }
      })

      .catch(error => {
        console.error(error)
      })

    setTimeout(fetchMessages, 5000);
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
    fetchMessages();
  }, [])

  useEffect(() => {
    console.log(receiptId);
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