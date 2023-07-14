import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import PasswordInput from '../../components/ui/PasswordInput';
import PasswordStrength from '../../components/ui/PasswordStrength';
import { Button, Card } from '@mui/material';
import styles from './auth.module.scss';
import { FlexCenter } from '../../components/flex';



const initialState = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const Register = () => {

  const [formData, setFormData] = useState(initialState);
  const { name, email, password, confirmPassword } = formData;

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

    if (!name || !email || !password || !confirmPassword) {
      return toast.error('Please fill in all the required fields.')
    }

    if (password.length < 8) {
      return toast.error('Password must be upto 8 characters ');
    }


    if (password !== confirmPassword) {
      return toast.error('Password do not match.');
    }
  }

  return (
    <div className={`container ${styles.auth}`}>
      <Card sx={{   paddingRight:'1.5rem' }}
      >
        <div className={styles.form}>
          

          <h2 style={{ color: '#141414' }}>Register</h2>
      

          <form onSubmit={registerUser}>
            <input
              type="text"
              placeholder="Name"
              required
              name="name"
              value={name}
              onChange={inputHandler}
            />

            <input
              type="email"
              placeholder="Company email address"
              required
              name="email"
              value={email}
              onChange={inputHandler}
            />

            <PasswordInput
              placeholder="Password"
              name="password"
              value={password}
              onChange={inputHandler}
            />

            <PasswordInput
              placeholder="Confirm Password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={inputHandler}
            />

            {/* Password Strength */}

           
            <PasswordStrength
              checkCase={checkCase}
              checkLength={checkLength}
              isNum={isNum}
              isChar={isChar}
            />

            <FlexCenter marginY={2}>

            <Button variant='contained' type="submit" >
              Register
            </Button>

            </FlexCenter>


          </form>


          <span className={styles.register}>
            <Link to="/" style={{
              color: '#447ab1'
            }}>Home</Link>
            <p> &nbsp; Already have an account? &nbsp;</p>
            <Link to="/login" style={{
              color: '#447ab1'
            }}>Login</Link>
          </span>

        </div>
      </Card>
    </div>

  )
}

export default Register