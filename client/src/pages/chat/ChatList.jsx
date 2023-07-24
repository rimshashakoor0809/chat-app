import React, { useEffect, useState } from 'react'
import { FlexBetween, FlexCenter, FlexColumn, FlexRow, FlexTextColumn } from '../../components/flex'
import { Paper, TextField, Typography } from '@mui/material'
import { useGetUserListQuery } from '../../redux/api/userSlice';
import Spinner from '../../components/ui/Spinner';
import UserList from '../../components/UserList';
import Header from '../../components/Header';
import Chat from '../../components/Chat';
import Welcome from '../../components/Welcome';



const ChatList = () => {

  const [search, setSearch] = useState('');
  const [currentChat, setCurrentChat] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [userList, setUserList] = useState(null);
  const [showChat, setShowChat] = useState(false);
   const [filteredUserList, setFilteredUserList] = useState(null);

   const { data, isLoading, isSuccess, isError, error } = useGetUserListQuery()


  const currentChatHandler = (userData) => {
    setCurrentChat(userData);
    if (currentChat) {
      setShowChat(true)

    }
  }




  useEffect(() => {
    if (!isLoading && isSuccess && data && !isError) {
      // console.log('current user:', data?.userInfo)
      setCurrentUser(data?.userInfo);
      if (currentChat === null) {
        setUserList(true)
      }

    }

  }, [isSuccess, data, isError, isLoading, currentChat])

   useEffect(() => {
    
     if (!isLoading && isSuccess && data && !isError) {
       const filteredUsers = data?.users?.filter(
      (user) =>
        user.username.toLowerCase().includes(search.toLowerCase()) );
        setFilteredUserList(filteredUsers);
       
     }
    
  }, [search, data,isSuccess, isError, isLoading,]);

  return (




    <FlexCenter height='100vh' >

      <Paper sx={{
        borderRadius: '15px',
        boxShadow: 'rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.05) 0px 8px 32px;',
        paddingY: '3rem',
        paddingX: '3rem',
        width: "80%",
        margin: '1rem',
        height:'70%'
      }}
      >

        <FlexRow  height='100%'>

          <FlexColumn >

            {/* Header */}
            <FlexTextColumn gap={2}>
              <Header info={currentUser} />
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
              
            </FlexBetween>


            <FlexColumn marginTop={2}
              sx={{ maxHeight: 300, overflow: 'auto' }}>

              {isLoading && <Spinner />}

              {(isError && error && !isLoading && !isSuccess) && console.log('error', error?.data?.message)}

              {(!isLoading && isSuccess && data && !isError) ? (

                filteredUserList?.map((user, index) => {
                  return <UserList
                    user={user}
                    key={user.user_id}
                    onClick={() => currentChatHandler(user)} />

                })
              ) : (
                <FlexCenter>
                  <Typography variant='caption'>No users found</Typography>
                </FlexCenter>
              )}


            </FlexColumn>

          </FlexColumn>


          <FlexColumn marginX={5} width='100%' position='relative'>
            {showChat ? <Chat currentChat={currentChat} currentUser={currentUser} /> : userList && <Welcome currentUser={currentUser} />}

          </FlexColumn>
        </FlexRow>




      </Paper>

    </FlexCenter>
  );
};

export default ChatList;










