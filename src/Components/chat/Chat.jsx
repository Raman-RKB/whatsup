import React from 'react';
import '../style/Chat.css';
import '../style/GlobalStyle.css';
import { MessageContainer } from "../modules/MessageContainer";
import { createChat, login } from "../modules/Routers";
import { clearLS, phoneNumber, idInstance } from "../modules/LSmodule";
import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchSendMessage, fetchReсeiveMessage, fetchDeleteReсeivedMessage } from '../modules/ApiService'
import { Input } from '../modules/Inputs'
import { Button } from '../modules/Buttons'

export const Chat = () => {
  const [textMessage, setTextMessage] = useState();
  const [displayMessage, setDisplayMessage] = useState([]);
  const [receiptId, setReceiptId] = useState();
  const navigate = useNavigate();
  const inputRef = useRef();

  const phone = phoneNumber();
  const id = idInstance();

  const textInsert = (event) => {
    const target = event.target.value;
    setTextMessage(target);
  }

  const sendMessage = (event) => {
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
          alert('Ошибка, проверьте ваше подключение к интернету и введенные данные')
        })
      :
      alert('введите текст сообщения');
  }

  const changeChat = () => {
    navigate(createChat)
  }

  const escape = () => {
    clearLS();
    navigate(login)
  }

  useEffect(() => {
    if (!id) {
      navigate(login);
    } else if (!phone) {
      navigate(createChat);
    }
  }, [])

  useEffect(() => {
    const fetchMessages = () => {
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
          } else if (response.body.senderData.sender === `${phone}@c.us`) {
            fetchDeleteReсeivedMessage(response.receiptId);
          }
        })
        .catch(error => {
          console.error(error)
          alert('Ошибка сети, проверьте ваше подключение к интернету')
        })
    }

    const intervalId = setInterval(() => {
      fetchMessages();
    }, 5000);

    return () => clearInterval(intervalId);
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
          {/* <input type="text" placeholder="Введите сообщение" ref={inputRef} onChange={textInsert} required /> */}
          <Input
            type={'text'}
            placeholder={'Введите сообщение'}
            handler={textInsert}
            ref={inputRef}
            required
          />
          <Button type={'submit'} handler={sendMessage} buttonName={'Send'}></Button>
          <Button type={'submit'} handler={changeChat} buttonName={'Change Chat'}></Button>
          <Button type={'submit'} handler={escape} buttonName={'Escape'}></Button>
        </form>
      </div>
    </div>
  );
}