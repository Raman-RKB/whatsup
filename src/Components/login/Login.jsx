import React from 'react';
import './style/Login.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchReсeiveMessage } from '../modules/ApiService'
import { Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function Login() {
    const [idInstance, setIdInstance] = useState();
    const [apiTokenInstance, setApiTokenInstance] = useState();
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    function idInstanceConfirm(event) {
        const target = event.target.value;
        setIdInstance(target);
    }

    function apiTokenInstanceConfirm(event) {
        const target = event.target.value;
        setApiTokenInstance(target);
    }

    function loginClick(event) {
        event.preventDefault()
        setIsLoading(true)
        if (idInstance && apiTokenInstance) {
            fetchReсeiveMessage(idInstance, apiTokenInstance)
                .then(response => {
                    localStorage.setItem('idInstance', idInstance);
                    localStorage.setItem('apiTokenInstance', apiTokenInstance);
                    navigate('/create-chat')
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
                    <input type="text" placeholder="Введите свой idInstance" required onChange={idInstanceConfirm} />
                    <label htmlFor="apiTokenInstance">API Token Instance:</label>
                    <input type="text" placeholder="Введите свой apiTokenInstance" required onChange={apiTokenInstanceConfirm} />
                    <button type="submit" onClick={loginClick}>Login</button>
                </form>
            </div>
        </div>
    );
}

export default Login;