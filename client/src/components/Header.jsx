import React, { useEffect } from 'react'
import { FlexBetween, FlexColumn, FlexRow, } from './flex'
import { Avatar, Button, Divider, Typography } from '@mui/material'
import { toast } from 'react-toastify'
import {  useLogoutMutation } from '../redux/api/userSlice'
import { useNavigate } from 'react-router-dom'
import Spinner from './ui/Spinner'
import { PowerSettingsNew } from '@mui/icons-material'

const Header = ({ info }) => {

  const [logoutUser, { data, isLoading, isSuccess, isError, error }, refetch] = useLogoutMutation();
  
  const navigate = useNavigate();
  

  const logOut = async () => {        
    
    try {
      await logoutUser();
      
    } catch (error) {
      console.log('Error: ', error)
    }
  }


  useEffect(() => {

    if (isLoading) {
      <Spinner />;
    }
    
    if (isSuccess && !isError && !error && !isLoading) {
      console.log('success')
      toast.success(data?.message);
      navigate('/login');
    } else if (!isLoading && isError && error) {

      console.log('Error updating:', error);
    }
    
  }, [isSuccess, isError, error, data, isLoading,navigate])
  
  return (
    <>
      <FlexBetween gap={9}>

            <FlexRow gap={2}>
          <Avatar sx={{ backgroundColor: '#111111' }}>
            {info?.name.charAt(0).toUpperCase()}
          </Avatar>

              <FlexColumn>
            <Typography fontWeight={600}>{info?.name}</Typography>
            <Typography fontSize={12}>{info?.email}</Typography>
            
              </FlexColumn>
            </FlexRow>
        <Button variant='contained' onClick={logOut}>
          <PowerSettingsNew/>
            </Button>

          </FlexBetween>
          <Divider />
    </>
  )
}

export default Header