import { Cancel, CheckCircle } from '@mui/icons-material'
import React from 'react'
import styles from './../../pages/auth/auth.module.scss';
import { Paper } from '@mui/material';

const PasswordStrength = ({ checkCase, isNum, isChar, checkLength }) => {
  
  const switchIcon = (condition) => {
    const isPassed = <CheckCircle sx={{color:'green', fontSize:'12px'}} />
    const isFailed = <Cancel sx={{color:'orangered',fontSize:'12px'}}/>
    return condition ? isPassed : isFailed;

  }
  return (
    <Paper sx={{backgroundColor:'#dffdff', paddingY:'0.5rem'}}>
      <ul className={styles.form_list}>
        <li>
          <span>
            {switchIcon(checkCase)}
             &nbsp; contain lowercase & uppercase letter
          </span>
        </li>
        <li>
          <span >
            {switchIcon(isNum)}
            &nbsp; contain number (0-9)
          </span>
        </li>
        <li>
          <span >
            {switchIcon(isChar)}
            &nbsp; contain special character (!@#$%^&*)
          </span>
        </li>
        <li>

          <span>
            {switchIcon(isChar)}
            &nbsp; contain special character (!@#$%^&*)
          </span>
        </li>
        <li>
          <span>
            {switchIcon(checkLength)}
            &nbsp; contain at least 8 character
          </span>
        </li>
      </ul>
    </Paper>
  )
}

export default PasswordStrength