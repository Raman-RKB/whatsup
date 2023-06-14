import React from 'react';
import './App.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchCheckPhone } from './ApiService'

function CreateChat() {
    const [phoneNumber, setPhoneNumber] = useState();
    const navigate = useNavigate();

    function insertPhoneNumber(event) {
        const target = event.target.value;
        setPhoneNumber(target);
    }

    function createChatClick(event) {
        event.preventDefault()
        console.log(phoneNumber);
        phoneNumber ? (
            fetchCheckPhone(phoneNumber)
                .then(response => {
                    if (response.existsWhatsapp) {
                        localStorage.setItem('phoneNumber', phoneNumber);
                        navigate('/');
                    } else {
                        alert('Такого номера не существует');
                    }
                })
        ) : (
            alert('Введите номер телефона')
        )
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