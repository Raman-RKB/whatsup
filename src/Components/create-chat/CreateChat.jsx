import React from 'react';
import '../style/LoginAndCreateChat.css';
import '../style/GlobalStyle.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchCheckPhone } from '../modules/ApiService'
import { phoneNumberSet } from "../modules/GetDataFromLS";
import { Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export const CreateChat = () => {
    const [phoneNumber, setPhoneNumber] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const insertPhoneNumber = (event) => {
        const target = event.target.value;
        setPhoneNumber(target);
    }

    const createChatClick = (event) => {
        event.preventDefault()
        setIsLoading(true)
        phoneNumber ? (
            fetchCheckPhone(phoneNumber)
                .then(response => {
                    if (response.existsWhatsapp) {
                        phoneNumberSet(phoneNumber);
                        navigate('/');
                    } else if (!response.existsWhatsapp) {
                        console.log(response);
                        setIsLoading(false)
                        alert('Такого номера не существует');
                    }
                })
                .catch(error => {
                    console.error(error)
                    alert('Ошибка, проверьте ваше подключение к интернету')
                })
        ) : (
            stopSpinner()
        )
    }

    const stopSpinner = () => {
        alert('Введите номер телефона')
        setIsLoading(false)
    }

    return (
        <div className="container">
            <div className="chat">
                {isLoading && <div className="spinner-container"><Spinner animation="border" /></div>}
                <form>
                    <label htmlFor="recipient">Recipient Phone Number:</label>
                    <input type="tel"
                        required
                        onChange={insertPhoneNumber} />
                    <button type="button" id="create-chat" onClick={createChatClick}>Create Chat</button>
                </form>
            </div>
        </div>
    );
}