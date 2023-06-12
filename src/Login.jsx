import React from 'react';
import './App.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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

    function loginClick() {
        if (idInstance && apiTokenInstance) {
            localStorage.setItem('idInstance', idInstance);
            localStorage.setItem('apiTokenInstance', apiTokenInstance);
            navigate('/create-chat')
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