import React from 'react';
import '../style/LoginAndCreateChat.css';
import '../style/GlobalStyle.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchReсeiveMessage } from '../modules/ApiService'
import { Input } from '../inputs/Inputs'
import { Button } from '../Buttons/Buttons'
import { createChat } from "../modules/Routers";
import { idInstanceSet, apiTokenInstanceSet } from "../modules/LSmodule";
import { Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export const Login = () => {
    const [idInstance, setIdInstance] = useState();
    const [apiTokenInstance, setApiTokenInstance] = useState();
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const idInstanceConfirm = (event) => {
        const target = event.target.value;
        setIdInstance(target);
    }

    const apiTokenInstanceConfirm = (event) => {
        const target = event.target.value;
        setApiTokenInstance(target);
    }

    const loginClick = (event) => {
        event.preventDefault()
        setIsLoading(true)
        if (idInstance && apiTokenInstance) {
            fetchReсeiveMessage(idInstance, apiTokenInstance)
                .then(response => {
                    idInstanceSet(idInstance);
                    apiTokenInstanceSet(apiTokenInstance);
                    navigate(createChat)
                    setIsLoading(false)
                })
                .catch(error => {
                    console.error(error)
                    alert('Ошибка, проверьте ваше подключение к интернету и введенные данные')
                    setIsLoading(false)
                })
        } else {
            alert('Вы ввели не все данные!');
            setIsLoading(false)
        }
    }

    return (
        <div className="container">
            <div className="login">
                <h2>Login to WhatsApp Chat</h2>
                {isLoading && <div className="spinner-container"><Spinner animation="border" /></div>}
                <form>
                    <label htmlFor="idInstance">ID Instance:</label>
                    <Input
                        type={'text'}
                        id={'idInstance'}
                        placeholder={'Введите свой idInstance'}
                        handler={idInstanceConfirm}
                        required
                    />
                    <label htmlFor="apiTokenInstance">API Token Instance:</label>
                    <Input
                        type={'text'}
                        id={'apiTokenInstance'}
                        placeholder={'Введите свой apiTokenInstance'}
                        handler={apiTokenInstanceConfirm}
                        required
                    />
                    <Button type={'submit'} handler={loginClick} buttonName={'Login'}></Button>
                </form>
            </div>
        </div>
    );
}