import React from 'react'
import { FlexRow, FlexTextColumn } from './flex'
import { Avatar, Box, Typography } from '@mui/material'



// message time formatter in 12-hour format
const formatDate = (dateString) => {
  try {
    const date = new Date(dateString);
    const formattedTime = date.toLocaleTimeString([], {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
    return formattedTime; // Output: 5:07 AM
  } catch (error) {
    console.log('Error while formatting date:', error);
    return ''; // Return an empty string if date parsing fails
  }
};

const ChatBubble = ({ messageContent, checkAuthor, user,myKey }) => {


  return (
    <FlexRow
      gap={1}
      key={myKey}
      justifyContent={checkAuthor === 'you' ? 'flex-start' : 'flex-end'}
      
    >

      {/* {console.log('Message content: ', messageContent)} */}

      <Avatar sx={{
        marginTop: '0.5rem',
        bgcolor: `${checkAuthor === 'you' ? 'purple' : 'orange'}`
      }}>
        {checkAuthor === 'you' ?'O' : 'S'}
        
      </Avatar>

      <FlexTextColumn>

        <Box
          padding={1}
          width='auto'
          backgroundColor={checkAuthor === 'you' ? '#696969' : 'lightgray'} borderRadius={1}
          color={checkAuthor === 'you' && '#fcfcfc'}

          marginY={1}
        >
          <FlexRow flexWrap='wrap'>
          <Typography> {messageContent?.message}</Typography>
          </FlexRow>
        </Box>
        <Typography variant='caption'>{formatDate(messageContent?.createdAt)}</Typography>

      </FlexTextColumn>

    </FlexRow>
  )
}

export default ChatBubble