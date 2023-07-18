import React, { useEffect, useState } from 'react'
import styles from './auth.module.scss';
import {Button, Divider, InputLabel, Paper, Typography} from '@mui/material'
import PasswordInput from '../../components/ui/PasswordInput';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'
import { FlexTextColumn } from '../../components/flex'
import { useLoginMutation } from '../../redux/api/userSlice';
import Spinner from '../../components/ui/Spinner';
// import Chat from '../../components/Chat';

const initialState = {
  email: '',
  password: '',
};

const Login = () => {

  const [formData, setFormData] = useState(initialState);
    // const [showChat, setShowChat] = useState(false);


  const { email, password } = formData;

  const [login, { data, isLoading, isSuccess, isError, error }] = useLoginMutation();


    const navigate = useNavigate();


  const inputHandler = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value }); 
  }

  const loginUser = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return toast.error('Please fill in all the required fields.')
    }

    if (password.length < 8) {
      return toast.error('Password must be upto 8 characters ');
    }

    const userData = {
       email, password
    }

    console.log('form data login', formData);
    try {
      await login(userData);
      console.log('check success', isSuccess)
      console.log('check isError', isError)
      console.log('check error', error)
      
    } catch (error) {
      console.log('Actual Error', error)
      toast.error('Something went wrong. Please try again.')
      
    }

  }


   useEffect(() => {
    if (isError && !isLoading && error) {
        toast.error(error?.data?.message)
      }

      if (isSuccess && !isLoading && !error) {
      toast.success("Login Successfully.")
      localStorage.setItem('access_token', data?.token);
      navigate('/chat')
    }
    
  }, [isSuccess,isLoading,error, isError,navigate, data])
  

  return (
    <div className={`container ${styles.auth}`}>

      {/* {showChat ?
        <Chat socket={socket} username={email} room={email} /> : */}
      
      {isLoading && <Spinner/>}
      <Paper sx={{
        padding: '1rem', borderRadius: '15px',
        boxShadow:'rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.05) 0px 8px 32px;'
      }}
      >
        <div className={styles.form}>
          <FlexTextColumn gap={1}>
          <Typography variant='h6' fontWeight='bold'>Real-time Chat App</Typography>
          <Divider/>
        
          <form onSubmit={loginUser}>
            <FlexTextColumn marginTop={2}>

            <InputLabel>Email Address</InputLabel>
            <input
              type="email"
              placeholder="abc@example.com"
              required
              name="email"
              value={email}
              onChange={inputHandler}
            />
              </FlexTextColumn>
              
            <FlexTextColumn>
            <InputLabel>Password</InputLabel>
            <PasswordInput
              placeholder='**********'
              name='password'
              value={password}
              onChange={inputHandler}
              
            />

            </FlexTextColumn>

          

            <Button variant='contained' type="submit" fullWidth>
              Login
            </Button>

        
            
          </form>

          <span className={styles.register}>
        
            <p> &nbsp; Not yet signed up? &nbsp;</p>
            <Link to="/register"
              style={{color: '#447ab1'}}>Sign up now</Link>
          </span>

          </FlexTextColumn>
        </div>
      </Paper>
        
  
     
      
    </div>
  )
}

export default Login