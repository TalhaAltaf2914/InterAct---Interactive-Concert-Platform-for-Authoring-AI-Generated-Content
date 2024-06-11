import { Card, Paper, Typography } from '@mui/material'
import React from 'react'

const Footer = () => {
  return (
    <Paper 
      elevation={3} 
      style={{textAlign:'center', width: "100%"}}>
      <footer>
        <Typography variant='body2' color={'GrayText'}>
          © InterAct 2024
        </Typography>
      </footer>
    </Paper>
  )
}

export default Footer