import { Box, Button, ButtonGroup, Card, Container, Paper, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { PassageInput } from './Passage/PassageInput'
import { Passage } from './Passage/Passage'

const words = [
  'Flashlight',
  'Cat',
  'Headphones',
  'Mouse',
  'Books',
  'Phones',

]

export const Home = () => {

  const [passages, setPassages] = useState([]);
  return (
    <Paper 
      elevation={3}
      sx={{
        paddingBlock:"1rem",
        paddingInline: '2rem',
        display:'flex',
        flexDirection:"column",
        // justifyContent: 'space-evenly',
        alignContent:'center',
        rowGap:'1rem',
        overflowY: 'scroll',
        minHeight: '100vh',
        height: '100vh',
      }}
    >
      <Box
        width={'100%'}
        component="section"
        // position={'sticky'}
        // top={'0px'}
      >
        <Typography
          variant='h6'
        >
          Toggle Words
        </Typography>

        <ButtonGroup 
          variant="text" 
        >
          {
            words.map((word, key)=>(
              <Button key={key}>{word}</Button>
            ))
          }
        </ButtonGroup>
      </Box>

      <Box
        width={'100%'}
        overflowY={'scroll'}
        // height={'20vh'}
        display={'flex'}
        flexDirection={'column'}
        rowGap={'3rem'}
      >
        {
          passages.length > 0
            &&
          passages.map((passageInput, key)=>(
            passageInput
          ))
        }
        
      </Box>
        <Button
          variant='contained'
          onClick={()=>{
            setPassages((passages)=>{
                return [...passages, <Passage />]
              }
            )
          }}  
        >
          Add a Passage
        </Button>
    </Paper>
  )
}
