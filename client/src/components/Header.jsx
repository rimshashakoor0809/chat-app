import React from 'react'
import { FlexBetween, FlexRow, FlexTextColumn } from './flex'
import { Avatar, Button, Divider, Typography } from '@mui/material'
import { toast } from 'react-toastify'
import { useUpdateStatusMutation } from '../redux/api/userSlice'
import { useNavigate } from 'react-router-dom'
import Spinner from './ui/Spinner'

const Header = ({ info }) => {

  const [updateStatus, {  isLoading, isSuccess, isError, error }] = useUpdateStatusMutation();
  const navigate = useNavigate();

  
  const logOut = async() => {
    
    
    try {
      await updateStatus({newStatus: false})
      if (isLoading && !isSuccess && !isError) {
        <Spinner/>
      }

      else if (!isLoading && isSuccess && !isError) {
        console.log('Status updated')
        localStorage.removeItem('access_token');
        toast.success("Logout Successfully.") 
      }

      else if (!isLoading && !isSuccess && isError && error) {
        console.log('Error updating:', error?.data?.message)
      }
      
    } catch (error) {
      console.log('Error: ', error)
    }
    navigate('/login')
  }

  return (
    <>
      <FlexBetween gap={9}>

            <FlexRow gap={2}>
          <Avatar sx={{ backgroundColor: '#111111' }}>
            {info?.userInfo?.name?.charAt(0).toUpperCase()}
          </Avatar>

              <FlexTextColumn>
            <Typography fontWeight={600}>{info?.userInfo?.name}</Typography>
            
            <Typography variant='caption'>{info?.userInfo?.status ? 'Online' : 'Offline'}</Typography>
            
              </FlexTextColumn>
            </FlexRow>
            <Button variant='contained' onClick={logOut}>Log out</Button>

          </FlexBetween>
          <Divider />
    </>
  )
}

export default Header