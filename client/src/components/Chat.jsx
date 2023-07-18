import { Avatar, Button, Divider,  Paper, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react'
import { FlexBetween, FlexCenter, FlexColumn, FlexRow, FlexTextColumn } from './flex';
import ChatForm from './ChatForm';
import ChatBubble from './ChatBubble';
import { toast } from 'react-toastify'

import { useNavigate, useParams } from 'react-router-dom';
import { useGetUserWithIDQuery } from '../redux/api/userSlice';
import { ArrowBack } from '@mui/icons-material';
import { useAddMessageMutation, useGetAllMsgsQuery } from '../redux/api/msgSlice';
import Spinner from '../components/ui/Spinner';




const Chat = () => {

  const [message, setMessage] = useState('');
  const [messageList, setMessageList] = useState([]);
  const scrollRef = useRef(null);
  const navigate = useNavigate();
  const { receiverId } = useParams();


  const { data, isSuccess, isLoading, isError } = useGetUserWithIDQuery(receiverId);
  
  const [addMessage, { data: msgData, isLoading: isMsgLoading, isSuccess: isMsgSuccess, isError: isMsgError }] = useAddMessageMutation();

  

  const { data: allMsgData, isSuccess: isAllMsgSuccess, isLoading: isAllMsgLoading, isError: isAllMsgError } = useGetAllMsgsQuery(receiverId);
  

  console.log('message list:', allMsgData);



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
          receiver: receiverId,
          message: message
      }        
      
      await addMessage(myData);
    

      
    } catch (error) {
      console.log('Error:', error)
    }
  //   // message data
  //   const messageData = {

  //     roomId: room,
  //     author: data?.userInfo?.username,
  //     message,
  //     senderId: data?.userInfo?.user_id
  //   }

  //   // sending message to socket
  //   await socket.emit('send_message', messageData);

  //   // adding message to list
  //   setMessageList(list => [...list, messageData]);
  //   setMessage('');
  }

  // useEffect(() => {

  //   // triggering the receiving message event 
  //   socket.on('receive_message', (data) => {
  //     setMessageList(list => [...list, data]);
  //     console.log('received data:', data)
  //   })

  //   const boxElement = scrollRef.current;
  //   boxElement.scrollTop = boxElement.scrollHeight;
  //   return () => socket.removeListener('receive_message')

  // }, [messageList, socket])
  
  
  useEffect(() => {
    if (isMsgLoading && !isMsgSuccess && !isMsgError) {
      <Spinner />
    }
    else if (!isMsgLoading && isMsgSuccess && msgData && !isMsgError) {
      toast.success( `Message: ${msgData.message}` )
      setMessage('');
    }

    else if (!isMsgLoading && !isMsgSuccess && !msgData && isMsgError) {
      toast.error('message not send')
    }
    
  }, [isMsgLoading, isMsgError, isMsgSuccess, msgData]);


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

  
    
  }, [isAllMsgError,isAllMsgLoading, isAllMsgSuccess, allMsgData])
  
  

  return (

    <FlexCenter height='100vh' width='100%' >

      <Paper sx={{
        padding: '1.5rem', borderRadius: '15px',
        boxShadow: 'rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.05) 0px 8px 32px;',
        paddingY: '3rem',
        width:'50%'
      }}
      >

      
        {/* Receiver chat header */}
        {(isSuccess && !isLoading && !isError) && (
          <>

          <FlexTextColumn gap={2}>
            
          <FlexBetween>
              <FlexRow gap={2}>
                
                <Avatar sx={{ backgroundColor: '#111111' }}>{data?.user?.username.charAt(0).toUpperCase()}
                </Avatar>

              <FlexTextColumn>
                  <Typography fontWeight={600}>{data?.user?.username}</Typography>
                  <Typography variant='caption'>{data?.user?.status ? 'Online' : 'Offline'}</Typography>
                  
                </FlexTextColumn>
                
            </FlexRow>

            <Button variant='outlined' onClick={()=>navigate('/chat')}>
            <ArrowBack/>
              </Button>


          </FlexBetween>

          <Divider />


        </FlexTextColumn>
        


            {/* Conversation Container */}

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
          )}
          
          {/* Iterating through the message array */}
          {messageList?.map(
          
            (messageContent, index) => {

              // checking the author of the message
              const checkAuthor = parseInt(receiverId) === messageContent.receiver_id ? 'other' : 'you';
  
              
              return <ChatBubble messageContent={messageContent} index={index} checkAuthor={checkAuthor} user={data?.user } />
              
      
          })}

          
          {/* send message container */}

        </FlexColumn>

          </>)
        
        }

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