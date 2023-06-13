const baseUrl = 'https://api.green-api.com';
const idInstance = localStorage.getItem('idInstance');
const apiTokenInstance = localStorage.getItem('apiTokenInstance');
const phoneNumber = localStorage.getItem('phoneNumber');

export function fetchSendMessage(textmessage) {
    console.log(phoneNumber);
    return fetch(`${baseUrl}/waInstance${idInstance}/sendMessage/${apiTokenInstance}`, {
        method: 'POST',
        body: JSON.stringify({
            chatId: `${phoneNumber}@c.us`,
            message: `${textmessage}`
        })
    })
        .then(response => response.json())
}

export function fetchReсeiveMessage() {
    return fetch(`${baseUrl}/waInstance${idInstance}/receiveNotification/${apiTokenInstance}`)
        .then(response => response.json())
}