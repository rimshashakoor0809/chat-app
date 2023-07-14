import { Button, Paper, Typography } from '@mui/material'
import React, { useState } from 'react'
import { FlexTextColumn } from './flex'
import TextInput from './ui/TextInput'


// form initial state
const INITIAL_STATE = {
  username: '',
  room: ''
}

const CreateRoom = () => {

  
  const [form, setForm] = useState(INITIAL_STATE);

  // destructing form data
  const { username, room } = form;

  // handling form state
  const inputHandler = e => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  const createRoom = () => {
    
  }

  return (
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

        <Button variant='contained' onClick={createRoom}>Join Room</Button>

      </Paper>
      
  )
}

export default CreateRoom