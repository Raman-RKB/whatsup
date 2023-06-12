const baseUrl = 'https://api.green-api.com';
const idInstance = localStorage.getItem('idInstance');
const apiTokenInstance = localStorage.getItem('apiTokenInstance');
const phoneNumber = localStorage.getItem('phoneNumber');

export function fetchSendmessage(textmessage) {
    return fetch(`${baseUrl}/waInstance${idInstance}/sendMessage/${apiTokenInstance}`, {
        method: 'POST',
        body: JSON.stringify({
            chatId: `${phoneNumber}@c.us`,
            message: `${textmessage}`
        })
    })
        .then(response => response.json())
}