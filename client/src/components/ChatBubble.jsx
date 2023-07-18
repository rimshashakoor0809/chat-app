import React from 'react'
import { FlexRow, FlexTextColumn } from './flex'
import { Avatar, Box, Typography } from '@mui/material'



// message time formatter in 12-hour format
const formatDate = (date) => {
  const newDate = new Date(date);
  const formattedTime = newDate.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true }); return formattedTime; // Output: 5:07 AM
}

const ChatBubble = ({ messageContent, index, checkAuthor, user }) => {


  return (
    <FlexRow
      gap={1}
      key={index}
      justifyContent={checkAuthor === 'you' ? 'flex-start' : 'flex-end'}
      
    >

      {/* {console.log('Message content: ', messageContent)} */}

      <Avatar sx={{
        marginTop: '0.5rem',
        bgcolor: `${checkAuthor === 'you' ? 'orange' : 'purple'}`
      }}>
        
      </Avatar>

      <FlexTextColumn>

        <Box
          padding={1}
          width='auto'
          backgroundColor={checkAuthor === 'you' ? '#565656' : 'lightgray'} borderRadius={1}
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