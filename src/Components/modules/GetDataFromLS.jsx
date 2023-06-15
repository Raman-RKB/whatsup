export const idInstanceSet = (idInstance) => {
    localStorage.setItem('idInstance', idInstance);
}

export const apiTokenInstanceSet = (apiTokenInstance) => {
    localStorage.setItem('apiTokenInstance', apiTokenInstance);
}

export const phoneNumberSet = (phoneNumber) => {
    localStorage.setItem('phoneNumber', phoneNumber);
}

export const phoneNumber = () => {
    const phoneNumber = localStorage.getItem('phoneNumber');
    return phoneNumber
}

export const idInstance = () => {
    const idInstance = localStorage.getItem('idInstance');
    return idInstance
}

export const apiTokenInstance = () => {
    const apiTokenInstance = localStorage.getItem('apiTokenInstance');
    return apiTokenInstance
}

export const clearLS = () => {
    localStorage.clear()
}