# Project "WhatsUp"
This is a simple chat application developed using React and GREEN-API. With this chat, you can communicate with other users and create new chats.

## Installation
To run the project, you'll need to install Node.js and npm. After installation, run the following commands:

### git clone https://github.com/Raman-RKB/whatsup.git
### cd whatsup
### npm install

## Running the App
After installing dependencies, run the following command:

### npm start
This command will start the application on a local server at http://localhost:3000/.

## Technologies Used
### React
### GREEN-API
### Project Structure
### ApiService.jsx - module for working with GREEN-API
### App.css - styles for the application
### AppRoutes.jsx - application routes
### Chat.jsx - component for the chat
### CreateChat.jsx - component for creating a new chat
### GetDataFromLS.jsx - module for getting data from local storage
### Login.jsx - component for user login
### MessageContainer.jsx - component for displaying messages
### index.css - global styles for the application
### index.js - entry point of the application

# Please note: 
## The GREEN API backend may not always work stably and occasionally messages in the queue may not be deleted immediately, which may result in the same message being reflected multiple times. 
## Additionally, there may be a delay in receiving incoming messages, as the request for incoming messages is made only once every 5 seconds, and sometimes multiple requests may be necessary to receive queued messages.