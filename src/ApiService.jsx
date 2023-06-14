const baseUrl = 'https://api.green-api.com';

const phoneNumber = localStorage.getItem('phoneNumber');

export function fetchSendMessage(textmessage) {
    const idInstance = localStorage.getItem('idInstance');
    const apiTokenInstance = localStorage.getItem('apiTokenInstance');
    return fetch(`${baseUrl}/waInstance${idInstance}/sendMessage/${apiTokenInstance}`, {
        method: 'POST',
        body: JSON.stringify({
            chatId: `${phoneNumber}@c.us`,
            message: `${textmessage}`
        })
    })
        .then(response => response.json())
}

export function fetchCheckPhone(phoneNumber) {
    const idInstance = localStorage.getItem('idInstance');
    const apiTokenInstance = localStorage.getItem('apiTokenInstance');
    return fetch(`${baseUrl}/waInstance${idInstance}/checkWhatsapp/${apiTokenInstance}`, {
        method: 'POST',
        body: JSON.stringify({
            phoneNumber: `${phoneNumber}`
        })
    })
        .then(response => response.json())
}

export function fetchReсeiveMessage(idInstanceProps, apiTokenInstanceProps) {
    const idInstance = localStorage.getItem('idInstance');
    const apiTokenInstance = localStorage.getItem('apiTokenInstance');
    return fetch(`${baseUrl}/waInstance${!idInstanceProps ? idInstance : idInstanceProps}/receiveNotification/${!apiTokenInstanceProps ? apiTokenInstance : apiTokenInstanceProps}`)
        .then(response => response.json())
}

export function fetchDeleteReсeivedMessage(receiptId) {
    const idInstance = localStorage.getItem('idInstance');
    const apiTokenInstance = localStorage.getItem('apiTokenInstance');
    return fetch(`${baseUrl}/waInstance${idInstance}/deleteNotification/${apiTokenInstance}/${receiptId}`, {
        method: 'DELETE'
    })
}