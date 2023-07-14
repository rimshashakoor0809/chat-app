import React from 'react'
import { useState } from 'react';
import './PasswordInput.scss'
import {Visibility, VisibilityOff} from '@mui/icons-material'


const PasswordInput = ({ placeholder, value, onChange, name, onPaste }) => {
  
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(prev => !prev);
  }
  return (
    <div className='password'>
      <input
        type={showPassword ? "text" : "password"}
        placeholder={placeholder}
        required
        name={name}
        value={value}
        onChange={onChange}
        onPaste={onPaste}
      />
      
      <div className="icon" onClick={togglePassword}>
        {showPassword ?
          (<Visibility/>) :
          (<VisibilityOff />)} 
      </div>
    </div>
  )
}

export default PasswordInput