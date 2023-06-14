import { Routes, Route } from "react-router-dom";
import Chat from "./Components/chat/Chat";
import Login from "./Components/login/Login";
import CreateChat from "./Components/create-chat/CreateChat";

export const AppRoutes = () => {

    return (
        <Routes>
            <Route path="/" element={<Chat />} />
            <Route path="/create-chat" element={<CreateChat />} />
            <Route path="/login" element={<Login />} />
        </Routes>
    );
};

export default AppRoutes;