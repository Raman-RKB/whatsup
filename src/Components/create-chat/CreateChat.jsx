import React from 'react';
import '../style/LoginAndCreateChat.css';
import '../style/GlobalStyle.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchCheckPhone } from '../modules/ApiService'
import { phoneNumberSet } from "../modules/LSmodule";
import { Input, Button } from '../modules/InputsButtons'
import { Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { chat } from '../modules/Routers';

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
                        navigate(chat);
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
                    <Input
                        type={'tel'}
                        id={'recipient'}
                        placeholder={'Введите номер телефона'}
                        handler={insertPhoneNumber}
                        required
                    />
                    <Button type={'button'} handler={createChatClick}>Create Chat</Button>
                </form>
            </div>
        </div>
    );
}

