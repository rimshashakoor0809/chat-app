import { Avatar,  Divider,  Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react'
import { FlexCenter, FlexColumn, FlexRow, FlexTextColumn } from './flex';
import ChatForm from './ChatForm';
import ChatBubble from './ChatBubble';
import { toast } from 'react-toastify'
import { useAddMessageMutation, useGetAllMsgsQuery } from '../redux/api/msgSlice';
import Spinner from '../components/ui/Spinner';
import { io } from 'socket.io-client';




const Chat = ({ currentChat, currentUser }) => {

  const [message, setMessage] = useState('');
  const [messageList, setMessageList] = useState([]);
  const [arrivalMsg, setArrivalMsg] = useState(null);
  const scrollRef = useRef(null);
  const socket = useRef();


  const [addMessage, { data: msgData, isLoading: isMsgLoading, isSuccess: isMsgSuccess, isError: isMsgError }] = useAddMessageMutation();


  const { data: allMsgData, isSuccess: isAllMsgSuccess, isLoading: isAllMsgLoading, isError: isAllMsgError } = useGetAllMsgsQuery(currentChat?.user_id);


  // handling sockets

  useEffect(() => {

    if (currentUser) {
      socket.current = io('http://localhost:3001');
      socket.current.emit('add_user', currentUser.id)
    }
  }, [currentUser])




  // message state handler
  const messageHandler = (e) => {
    setMessage(e.target.value);
  }

  // send message method
  const sendMessage = async () => {

    try {
      if (!message) {
        return toast.error('Please enter a message to send');
      }

      const myData = {
        receiver: currentChat?.user_id,
        sender:currentUser?.id,
        message: message
      }

      await addMessage(myData);
      socket.current.emit('send_msg', {
        receiver_id: currentChat.user_id,
        sender_id: currentUser.id,
        message: message
      })

      setMessage('');
      

    } catch (error) {
      console.log('Error:', error)
    }
  }

  useEffect(() => {
    if (socket.current) {
      socket.current.on('msg_received', (msg) => {
        setArrivalMsg({
          receiver_id: currentChat.user_id,
          sender_id: currentUser.id,
          message:msg
        })
        
      })
    }
  }, [currentChat, currentUser]);


  useEffect(() => {
  
    arrivalMsg?.message && setMessageList((prev) => [...prev, arrivalMsg])
  
  }, [arrivalMsg])
  
  // Sort the messageList array based on the 'createdAt' timestamp before rendering
  const sortedMessageList = messageList.slice().sort((a, b) => {
    return new Date(a.createdAt) - new Date(b.createdAt);
  });




  // storing messages into db
  useEffect(() => {

    if (isMsgLoading && !isMsgSuccess && !isMsgError) {
      <Spinner />
    }
  
    else if (!isMsgLoading && !isMsgSuccess && !msgData && isMsgError) {

      toast.error('message not send')
    }

  }, [isMsgLoading, isMsgError, isMsgSuccess, msgData]);


  // fetching all the messages
  useEffect(() => {

    if (isAllMsgLoading && !isAllMsgSuccess && !isAllMsgError) {
      <Spinner />
    }
    else if (!isAllMsgLoading && isAllMsgSuccess && allMsgData && !isAllMsgError) {

      setMessageList(allMsgData)

    }

    else if (!isAllMsgLoading && !isAllMsgSuccess && !allMsgData && isAllMsgError) {
      toast.error('failed to get messages')
    }

  }, [isAllMsgError, isAllMsgLoading, isAllMsgSuccess, allMsgData])


  // Scrolls down to the bottom of container
  useEffect(() => {
    const boxElement = scrollRef.current;
    if (boxElement) {
      boxElement.scrollTop = boxElement.scrollHeight;
    }
  }, [messageList]);

  return (

    <>
      {/* Receiver chat header */}

      <FlexTextColumn gap={2} >

        <FlexRow gap={2}>

          <Avatar sx={{ backgroundColor: '#111111' }}>{currentChat?.username.charAt(0).toUpperCase()}
          </Avatar>

          <FlexTextColumn>
            <Typography fontWeight={600}>{currentChat?.username}</Typography>
            <Typography variant='caption'>{currentChat?.status ? 'Online' : 'Offline'}</Typography>

          </FlexTextColumn>

        </FlexRow>

        <Divider />
      </FlexTextColumn>

      {/* Conversation Container */}

      <FlexColumn
        border='1px solid #ccc'
        marginY={2}
        borderRadius={2}
        padding={2}
        height='100%'
        sx={{ maxHeight: 250, overflow: 'auto' }}
        ref={scrollRef}
    

      >

        {sortedMessageList.length === 0 && (

          <FlexCenter padding={5} height='100%' alignItems='center'>
            <Typography>No Messages found.</Typography>
          </FlexCenter>
        )}

        {/* Iterating through the message array */}
        {sortedMessageList?.map(

          (messageContent, index) => {
            // console.log('message content', messageContent)

            // checking the author of the message
            const checkAuthor = parseInt(currentChat?.user_id) === messageContent.receiver_id ? 'other' : 'you';



            return <ChatBubble messageContent={messageContent} myKey={messageContent.msg_id} checkAuthor={checkAuthor} user={currentChat} />


          })}

      </FlexColumn>

      {/* send message container */}
      <ChatForm
        message={message}
        onChange={messageHandler}
        sendMessage={sendMessage}
      />
    </>
  )
}

export default Chat

