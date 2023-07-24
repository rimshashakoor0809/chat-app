import React from 'react'
import { FlexCenter } from './flex'
import { Typography } from '@mui/material'

import gifImage from '../gifs/hello.gif';

const Welcome = ({ currentUser }) => {
  
  return (
    <>
        <FlexCenter border='1px solid #ccc' borderRadius={3} height='100%'>
          <FlexCenter margin='0 auto' gap={1} flexDirection='column'>
          <Typography variant='h4' fontWeight={600}>Welcome {currentUser.name}! </Typography>
          <Typography>Please select a chat to Start Messaging 🚀</Typography>

          <img src={gifImage} alt="Your GIF" style={{height:'200px', width:'200px'}} />

          </FlexCenter>
       </FlexCenter>
      </>
  )
}

export default Welcome