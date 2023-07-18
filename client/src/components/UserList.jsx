import { Avatar, Box, Divider, Typography } from '@mui/material'
import React, { useState } from 'react'
import { FlexBetween, FlexRow, FlexTextColumn } from './flex'
import {  Circle } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';


function generateRandomColor() {
  // Generate random values for red, green, and blue (RGB) components
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);

  // Combine RGB components into a hexadecimal color code
  const color = `#${red.toString(16).padStart(2, '0')}${green.toString(16).padStart(2, '0')}${blue.toString(16).padStart(2, '0')}`;

  return color;
}
const UserList = ({ user, onClick }) => {

  const [selectUser, setSelectUser] = useState(false);
  const navigate = useNavigate();

  
  return (
    
    <Box>

      {selectUser && navigate(`/chat/${user.user_id}`)}
      
      <FlexBetween marginX={2} marginY={1} onClick={() => setSelectUser(true)} >

        
        <FlexRow gap={2}>

          {/* Avatar */}
          <Avatar sx={{ backgroundColor: `${generateRandomColor()}` }}>
            {user?.username?.charAt(0).toUpperCase()}
          </Avatar>

          <FlexTextColumn>

            {/* Name & Status */}
            <Typography fontWeight={600}>{user?.username}</Typography>

            <Typography variant='caption'>
              {user.status ? 'Online' : 'Offline'}
            </Typography>

          </FlexTextColumn>
        </FlexRow>

        <Circle sx={{ fontSize: '10px', color: `${user.status ? 'green' : ' orangered'}` }} />

      </FlexBetween>
      <Divider variant='middle' />
    </Box>
  )
}

export default UserList