import {  Button, TextField } from '@mui/material';
import React, { } from 'react'
import {  SendRounded } from '@mui/icons-material'
import { FlexBetween } from './flex';



const ChatForm = ({ message, onChange, sendMessage }) => {



  return (
    <FlexBetween width='100%' sx={{
      position: 'absolute',
      bottom:0
    }}>
      
      <TextField
        name='message'
        placeholder='Enter text here...'
        size='small'
        onChange={onChange}
        value={message}
        onKeyDown={event => { event.key === 'Enter' && sendMessage() }}
        fullWidth
      >

      </TextField>
      <Button
        variant='contained'
        onClick={sendMessage}

      >
        <SendRounded sx={{ color: '#fcfcfc' }} />
      </Button>
    </FlexBetween>
  )
}

export default ChatForm