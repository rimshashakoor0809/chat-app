import { InputLabel, TextField } from '@mui/material'
import React from 'react'

const TextInput = ({label, value, inputHandler}) => {
  return (
    <>
      <InputLabel>{label }</InputLabel>
      <TextField
        variant='outlined'
        size='small'
        onChange={inputHandler}
        value={value}
        name={label.toLowerCase()} />
    </>
  )
}

export default TextInput