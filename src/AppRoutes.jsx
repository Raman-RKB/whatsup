import { Routes, Route } from "react-router-dom";
import Chat from "./Chat";
import Login from "./Login";
import CreateChat from "./CreateChat";

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