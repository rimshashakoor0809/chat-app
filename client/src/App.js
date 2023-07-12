import './App.css';
import io from 'socket.io-client';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Button,  Paper, Typography } from '@mui/material';
import { useState } from 'react';
import Chat from './components/Chat';
import { FlexCenter, FlexTextColumn } from './components/flex';
import TextInput from './components/ui/TextInput';


// connection with backend
const socket = io.connect('http://localhost:3001')

// form initial state
const INITIAL_STATE = {
  username: '',
  room: ''
}


function App() {

  const [form, setForm] = useState(INITIAL_STATE);
  const [showChat, setShowChat] = useState(false);

  // destructing form data
  const { username, room } = form;

  // handling form state
  const inputHandler = e => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  // joining room method
  const joinRoom = () => {

    try {
      
      // if fields are empty
      if (!username && !room) {
        return toast.error('Please fill all the required fields');
      }
      // trigger join room event
      socket.emit('join_room', room);
      toast.success(`${username} joined the room successfully.`)
      setShowChat(true)
      // setForm(INITIAL_STATE);
    } catch (error) {
      toast.error(error)
      
    }

  }
  return (

    <FlexCenter height='100vh'>
      <ToastContainer />

      {showChat ?
        <Chat socket={socket} username={username} room={room} />
      :
      <Paper sx={{
        backgroundColor: '#9CBAF0',
        padding: '2rem',
        gap: '1rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
        }}>
          
        <Typography variant='h5'>Join Rooms</Typography>

        <FlexTextColumn>
            <TextInput label='Username' value={username } inputHandler={inputHandler} />
        </FlexTextColumn>

        <FlexTextColumn>
            <TextInput label='Room' value={room} inputHandler={inputHandler} />
        </FlexTextColumn>

        <Button variant='contained' onClick={joinRoom}>Join Room</Button>
      </Paper>
      
    }
    </FlexCenter>
    
  );
}

export default App;
