import React, { useState } from 'react'
import styles from './auth.module.scss';
import {Button, Card} from '@mui/material'
import PasswordInput from '../../components/ui/PasswordInput';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify'
import {FlexCenter} from '../../components/flex'

const initialState = {
  email: '',
  password: '',
};

const Login = () => {

  const [formData, setFormData] = useState(initialState);

  const { email, password } = formData;

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

    // const userData = {
    //   email, password
    // }

  }

  return (
    <div className={`container ${styles.auth}`}>
     
      <Card sx={{  padding:'1rem', paddingRight:'2.5rem' }}
      >
        <div className={styles.form}>
          <h2 style={{ color: '#141414' }}>Login</h2>
          <br />
          
          <form onSubmit={loginUser}>
            <input
              type="email"
              placeholder="Email"
              required
              name="email"
              value={email}
              onChange={inputHandler}
            />
            
            <PasswordInput
              placeholder='Password'
              name='password'
              value={password}
              onChange={inputHandler}
              
            />
            <FlexCenter>

            <Button variant='contained' type="submit">
              Login
            </Button>

            </FlexCenter>
            
          </form>

          <span className={styles.register}>
            <Link to="/" style={{
            color: '#447ab1'}}>Home</Link>
            <p> &nbsp; Don't have an account? &nbsp;</p>
            <Link to="/register" style={{
            color: '#447ab1'}}>Register</Link>
          </span>
        </div>
      </Card>
      
    </div>
  )
}

export default Login