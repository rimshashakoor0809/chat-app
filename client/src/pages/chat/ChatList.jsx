import React, { useState } from 'react'
import { FlexBetween, FlexCenter, FlexColumn,  FlexTextColumn } from '../../components/flex'
import {  Button, Paper, TextField, Typography } from '@mui/material'

import { SearchOutlined } from '@mui/icons-material'
import { useGetUserListQuery } from '../../redux/api/userSlice';
import Spinner from '../../components/ui/Spinner';
import UserList from '../../components/UserList';
import Header from '../../components/Header';


const ChatList = () => {

  const [search, setSearch] = useState('');

  

  const { data, isLoading, isSuccess, isError, error } = useGetUserListQuery()
  // const room = getRandomFiveDigitNumber();



  function getRandomFiveDigitNumber() {
  const min = 10000; // Minimum value (inclusive)
  const max = 99999; // Maximum value (inclusive)
  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomNumber;
}

  // const chatHandler = () => {

  //   try {
  
  //     // trigger join room event
  //     socket.emit('join_room',);
  //     toast.success(`${room} joined the room successfully.`)
  //     setShowChat(true)
  //   } catch (error) {
  //     toast.error(error)
      
  //   }
  
  // }

  return (

    <FlexCenter height='100vh' width='100%' >

      

      <Paper sx={{
        padding: '1.5rem', borderRadius: '15px',
        boxShadow: 'rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.05) 0px 8px 32px;',
        paddingY:'3rem'
      }}
      >

        {/* Header */}
        <FlexTextColumn gap={2}>
          <Header info={ data} />
        </FlexTextColumn>

        {/* Search */}
        <FlexBetween marginY={2}>
          <TextField name='search'
            placeholder='search user to start chat'
            value={search}
            onChange={event => setSearch(event.target.value)}
            size='small'
            fullWidth
          />
          <Button variant='contained' >
            <SearchOutlined />
          </Button>
        </FlexBetween>

        
        <FlexColumn marginTop={2} sx={{ maxHeight: 300, overflow: 'auto' }}>
          
          {isLoading && <Spinner />}
          
          {(isError && error && !isLoading) && console.log('error', error?.data?.message)}

           {!isLoading && isSuccess && data ? (
            data?.users?.map((user, index) => {

              return     <UserList user={user} key={user.user_id}  />

            })
          ) : (
              <FlexCenter>
                <Typography variant='caption'>No users found</Typography>
              </FlexCenter>
          )}

          {/* onClick={() => { 
                chatHandler();
                navigate(`/chat/${user?.userInfo?.user_id}`)
              } 
            } */}

        </FlexColumn>
      </Paper>
    </FlexCenter>
  ); 
};

export default ChatList;








          

