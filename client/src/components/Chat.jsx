import { Avatar, Divider, Paper, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { FlexBetween, FlexCenter, FlexColumn, FlexTextColumn } from './flex';
import ChatForm from './ChatForm';
import ChatBubble from './ChatBubble';
import { useRef } from 'react';

const Chat = ({ socket, username, room }) => {

  const [message, setMessage] = useState('');
  const [messageList, setMessageList] = useState([]);
  const scrollRef = useRef(null);


  // message state handler
  const messageHandler = (e) => {
    setMessage(e.target.value);
  }

  // message time formatter in 12-hour format
  const formatAMPM = (date) => {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    let strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }

  // send message method
  const sendMessage = async () => {

    // If message is empty
    if (!message) {
      alert('Please enter a message to send.')
    }

    // message data
    const messageData = {
      room,
      author: username,
      message,
      date: formatAMPM(new Date(Date.now())),
      status: 'sent'

    }

    // sending message to socket
    await socket.emit('send_message', messageData);
    // adding message to list
    setMessageList(list => [...list, messageData]);
    setMessage('');
  }

  useEffect(() => {

    // triggering the receiving message event 
    socket.on('receive_message', (data) => {
      setMessageList(list => [...list, data]);
    })

    const boxElement = scrollRef.current;
    boxElement.scrollTop = boxElement.scrollHeight;
    return () => socket.removeListener('receive_message')

  }, [socket, messageList])

  return (

    <FlexCenter backgroundColor='#9cbaf0' height='100%' width='100%'>

      <Paper sx={{ height: 'auto', padding: '2rem', width: '80%' }}>

        {/* header */}
        <FlexBetween>
          <FlexTextColumn gap={1}>
            <Typography variant='h5'>Private Chat Room : {room}</Typography>
            <Divider />
          </FlexTextColumn>

          <Avatar sx={{ marginTop: '0.5rem', bgcolor:'burlywood' }}>
            {username?.charAt(0)}
          </Avatar>

        </FlexBetween>

        {/* conversation container */}

        <FlexColumn
          border='1px solid #ccc'
          marginY={2}
          borderRadius={2}
          padding={2}
          sx={{ maxHeight: 300, overflow: 'auto' }}
          ref={scrollRef}
        >
          
          {messageList.length === 0 && (

            <FlexCenter padding={5}>
                  <Typography>No Messages found.</Typography>
                </FlexCenter>
          ) }
          {/* Iterating through the message array */}
          {messageList?.map(
          
            (messageContent, index) => {

              // checking the author of the message
              let checkAuthor = username === messageContent.author ? 'you' : 'other';
              return <ChatBubble checkAuthor={checkAuthor} messageContent={messageContent} index={index} />
              
      
          })}

          
          {/* send message container */}

          

        </FlexColumn>
        <ChatForm
            message={message}
            onChange={messageHandler}
            sendMessage={sendMessage}
          />



      </Paper>
    </FlexCenter>
  )
}

export default Chat