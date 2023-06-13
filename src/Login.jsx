import React from 'react';
import './App.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchReсeiveMessage } from './ApiService'
//----------------------------
function Login() {
    const [idInstance, setIdInstance] = useState();
    const [apiTokenInstance, setApiTokenInstance] = useState();

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
        if (idInstance && apiTokenInstance) {
            fetchReсeiveMessage(idInstance, apiTokenInstance)
                .then(response => {
                    if (response) {
                        localStorage.setItem('idInstance', idInstance);
                        localStorage.setItem('apiTokenInstance', apiTokenInstance);
                        navigate('/create-chat')
                    }
                })
                .catch(error => {
                    console.error(error)
                    alert('Не верные данные')
                })
        } else {
            alert('Вы ввели не все данные!');
        }
    }

    return (
        <div className="container">
            <div className="login">
                <h2>Login to WhatsApp Chat</h2>
                <form>
                    <label htmlFor="idInstance">ID Instance:</label>
                    <input type="text" id="idInstance" name="idInstance" required onChange={idInstanceConfirm} />
                    <label htmlFor="apiTokenInstance">API Token Instance:</label>
                    <input type="text" id="apiTokenInstance" name="apiTokenInstance" required onChange={apiTokenInstanceConfirm} />
                    <button type="submit" onClick={loginClick}>Login</button>
                </form>
            </div>
        </div>
    );
}

export default Login;