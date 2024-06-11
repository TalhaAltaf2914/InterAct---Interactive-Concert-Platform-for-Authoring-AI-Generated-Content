import { Box, Button, ButtonGroup, Card, Container, Paper, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Passage } from './Passage/Passage'
import AddIcon from '@mui/icons-material/Add';

import PostAddIcon from '@mui/icons-material/PostAdd';
const words = [
  'Flashlight',
  'Cat',
  'Headphones',
  'Mouse',
  'Books',
  'Phones',
  'Cups',
  'Shoes',

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
        rowGap:'2rem',
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
        
        sx={{
          width: 'fit-content',
          alignSelf:'center'
        }}
        variant='contained'
        onClick={()=>{
          setPassages((passages)=>{
              return [...passages, <Passage />]
            }
          )
        }}  
      >
        <PostAddIcon />
      </Button>
    </Paper>
  )
}
