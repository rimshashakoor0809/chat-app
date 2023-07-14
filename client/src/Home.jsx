import { Button, Paper, Typography } from '@mui/material'
import React from 'react'
import { FlexCenter, FlexRow } from './components/flex'
import { useNavigate } from 'react-router-dom'

const Home = () => {

  const navigate = useNavigate();
  return (
     <FlexCenter height='100vh'>

      <FlexCenter gap={4} flexDirection='column'>

        
        <Paper sx={{
          backgroundColor: '#9CBAF0',
          padding: '2rem',
          gap: '2rem',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          paddingY: '4rem',
        }}>

          <Typography variant='h5'>Connecting people, bridging hearts!</Typography>
          <FlexRow gap={2}>
          
          <Button variant='contained' onClick={()=>navigate('/login')}>Login</Button>
          <Button variant='contained' onClick={()=>navigate('/register')}>Register</Button>
        </FlexRow>
        </Paper>
        

      </FlexCenter>


      
    </FlexCenter>
  )
}

export default Home