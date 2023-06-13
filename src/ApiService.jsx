const baseUrl = 'https://api.green-api.com';
const idInstance = localStorage.getItem('idInstance');
const apiTokenInstance = localStorage.getItem('apiTokenInstance');
const phoneNumber = localStorage.getItem('phoneNumber');

export function fetchSendMessage(textmessage) {
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
    return fetch(`${baseUrl}/waInstance${idInstance}/checkWhatsapp/${apiTokenInstance}`, {
        method: 'POST',
        body: JSON.stringify({
            phoneNumber: `${phoneNumber}`
        })
    })
        .then(response => response.json())
}

export function fetchReсeiveMessage(idInstanceProps, apiTokenInstanceProps) {
    return fetch(`${baseUrl}/waInstance${!idInstanceProps ? idInstance : idInstanceProps}/receiveNotification/${!apiTokenInstanceProps ? apiTokenInstance : apiTokenInstanceProps}`)
        .then(response => response.json())
}

export function fetchDeleteReсeivedMessage(receiptId) {
    return fetch(`${baseUrl}/waInstance${idInstance}/deleteNotification/${apiTokenInstance}/${receiptId}`, {
        method: 'DELETE'
    })
}