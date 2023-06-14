import { phoneNumber, idInstance, apiTokenInstance } from "./GetDataFromLS";
const baseUrl = 'https://api.green-api.com';

export function fetchReсeiveMessage(idInstanceProps, apiTokenInstanceProps) {
    const id = idInstance();
    const token = apiTokenInstance();
    return fetch(`${baseUrl}/waInstance${!idInstanceProps ? id : idInstanceProps}/receiveNotification/${!apiTokenInstanceProps ? token : apiTokenInstanceProps}`)
        .then(response => response.json())
}

export function fetchSendMessage(textmessage) {
    const id = idInstance();
    const token = apiTokenInstance();
    const phone = phoneNumber();
    return fetch(`${baseUrl}/waInstance${id}/sendMessage/${token}`, {
        method: 'POST',
        body: JSON.stringify({
            chatId: `${phone}@c.us`,
            message: `${textmessage}`
        })
    })
        .then(response => response.json())
}

export function fetchCheckPhone(phoneNumberProp) {
    const id = idInstance();
    const token = apiTokenInstance();
    return fetch(`${baseUrl}/waInstance${id}/checkWhatsapp/${token}`, {
        method: 'POST',
        body: JSON.stringify({
            phoneNumber: `${phoneNumberProp}`
        })
    })
        .then(response => response.json())
}

export function fetchDeleteReсeivedMessage(receiptId) {
    const id = idInstance();
    const token = apiTokenInstance();
    return fetch(`${baseUrl}/waInstance${id}/deleteNotification/${token}/${receiptId}`, {
        method: 'DELETE'
    })
}