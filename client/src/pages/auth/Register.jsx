import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import PasswordInput from '../../components/ui/PasswordInput';
import PasswordStrength from '../../components/ui/PasswordStrength';
import { Button,  Divider, InputLabel, Paper, Typography } from '@mui/material';
import styles from './auth.module.scss';
import {  FlexTextColumn } from '../../components/flex';
import { useRegisterMutation } from '../../redux/api/userSlice';
import Spinner from '../../components/ui/Spinner';



const initialState = {
  name: '',
  email: '',
  password: '',
};

const Register = () => {

  const [formData, setFormData] = useState(initialState);
  const { name, email, password } = formData;
  
   const [register, { isLoading, isSuccess, isError, error }] = useRegisterMutation();

  const navigate = useNavigate();

  const [checkCase, setCheckCase] = useState(false);
  const [checkLength, setCheckLength] = useState(false);
  const [isChar, setIsChar] = useState(false);
  const [isNum, setIsNum] = useState(false);

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }


  useEffect(() => {

    const regexCase = /^(?=.*[a-z])(?=.*[A-Z])/;
    const regexNum = /([0-9])/;
    const regexChar = /[ `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/;


    if (password.match(regexCase)) {
      setCheckCase(true);
    }
    else {
      setCheckCase(false);
    }
    if (password.match(regexNum)) {
      setIsNum(true);
    }
    else {
      setIsNum(false);
    }
    if (password.match(regexChar)) {
      setIsChar(true);

    } else {
      setIsChar(false);
    }
    if (password.length >= 8) {
      setCheckLength(true);
    }
    else {
      setCheckLength(false)
    }
  }, [password]);


  const registerUser = async (e) => {
    e.preventDefault();

    
    if (!name || !email || !password ) {
      return toast.error('Please fill in all the required fields.')
    }

    if (password.length < 8) {
      return toast.error('Password must be upto 8 characters ');
    }

    const userData = {
      name, email, password,
    }

    console.log('form data register', formData);
    try {
      await register(userData);
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
        toast.success('Account Registered Successfully')
        navigate('/login')
      }
    
  }, [isSuccess,isLoading,error, isError,navigate])

  return (
    <div className={`container ${styles.auth}`}>

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
      

          <form onSubmit={registerUser}>

            <FlexTextColumn marginTop={2}>

            <InputLabel>Name</InputLabel>

            <input
              type="text"
              placeholder="John Doe"
              required
              name="name"
              value={name}
              onChange={inputHandler}
            />

            </FlexTextColumn>

            <FlexTextColumn>
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
              placeholder="********"
              name="password"
              value={password}
              onChange={inputHandler}
            />
              
            </FlexTextColumn>

            {/* Password Strength */}

              <FlexTextColumn marginY={1}>
                
            <PasswordStrength
              checkCase={checkCase}
              checkLength={checkLength}
              isNum={isNum}
              isChar={isChar}
            />

            </FlexTextColumn>
           


            <Button variant='contained' type="submit" fullWidth>
              Register
            </Button>

          


          </form>


          <span className={styles.register}>
        
            <p> &nbsp; Already signed up? &nbsp;</p>
            <Link to="/login"
              style={{color: '#447ab1'}}>Login now</Link>
          </span>


        </FlexTextColumn>

        </div>

      </Paper>
    </div>

  )
}

export default Register