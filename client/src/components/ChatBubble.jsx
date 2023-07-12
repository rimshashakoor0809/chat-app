import React from 'react'
import { FlexRow, FlexTextColumn } from './flex'
import { Avatar, Box, Typography } from '@mui/material'

const ChatBubble  = ({checkAuthor, messageContent, index}) => {
  return (
    <FlexRow
                gap={1}
                key={index}
                justifyContent={checkAuthor === 'you' ? 'flex-start' :'flex-end' }
              >

                  <Avatar sx={{ marginTop: '0.5rem', bgcolor: `${checkAuthor === 'you' ? 'orange' : 'purple'}` }}>
                    {messageContent?.author?.charAt(0)}
                  </Avatar>

                  <FlexTextColumn>

                    <Box
                      padding={1}
                      width='auto'
                      backgroundColor={checkAuthor === 'you' ? 'skyblue' :'lightgray' }
                      borderRadius={1}
                      marginY={1}
                    >
                      <Typography> {messageContent?.message}</Typography>
                    </Box>
                    <Typography variant='caption'>{messageContent?.date}</Typography>

                  </FlexTextColumn>

                </FlexRow>
  )
}

export default ChatBubble