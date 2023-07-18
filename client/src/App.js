
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Routes, Route } from "react-router-dom"
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ChatList from "./pages/chat/ChatList";
import Chat from './components/Chat'




function App() {


  return (

    <>
      <ToastContainer />
      <Routes>

        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/chat" element={<ChatList />} />
        <Route path="/chat/:receiverId" element={<Chat />} />
      </Routes>
    </>

  );
}

export default App;
