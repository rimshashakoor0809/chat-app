import { Cancel, CheckCircle } from '@mui/icons-material'
import React from 'react'
import styles from './../../pages/auth/auth.module.scss';
import { Card, Paper } from '@mui/material';

const PasswordStrength = ({ checkCase, isNum, isChar, checkLength }) => {
  
  const switchIcon = (condition) => {
    const isPassed = <CheckCircle sx={{color:'green'}} fontSize='small'/>
    const isFailed = <Cancel sx={{color:'orangered'}} fontSize='small' />
    return condition ? isPassed : isFailed;

  }
  return (
    <Paper sx={{padding:'0.15rem', backgroundColor:'#dffdff'}}>
      <ul className={styles.form_list}>
        <li>
          <span className={styles.indicator}>
            {switchIcon(checkCase)}
            &nbsp; contain lowercase & uppercase letter
          </span>
        </li>
        <li>
          <span className={styles.indicator}>
            {switchIcon(isNum)}
            &nbsp; contain number (0-9)
          </span>
        </li>
        <li>
          <span className={styles.indicator}>
            {switchIcon(isChar)}
            &nbsp; contain special character (!@#$%^&*)
          </span>
        </li>
        <li>

          <span className={styles.indicator}>
            {switchIcon(isChar)}
            &nbsp; contain special character (!@#$%^&*)
          </span>
        </li>
        <li>
          <span className={styles.indicator}>
            {switchIcon(checkLength)}
            &nbsp; contain at least 8 character
          </span>
        </li>
      </ul>
    </Paper>
  )
}

export default PasswordStrength