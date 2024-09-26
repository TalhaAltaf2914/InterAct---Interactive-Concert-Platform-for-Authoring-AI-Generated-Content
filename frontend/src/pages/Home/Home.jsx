import { Box, Button, ButtonGroup, Card, Container, Paper, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import AddIcon from '@mui/icons-material/Add';

import PostAddIcon from '@mui/icons-material/PostAdd';
import { Passage } from '../../components/Passage/Passage';
import { usePassagesStore } from '../../stores/PassagesStore/PassagesStore';


import { TransitionGroup } from 'react-transition-group';

export const Home = () => {

  // const [passages, setPassages] = useState([<Passage />]);
  const {passages, setPassages, addPassage, deletePassage} = usePassagesStore();

  // const handleDeletePassage = (id) =>{
  //   setPassages(passages => passages.filter((passage, index) => id !== index))
  // }

  //on initial render display one passage
  // useEffect(()=>{
  //   //add one passage only if passages is empty
  //   if(passages.length === 0){
  //     setPassages([
  //       // {
  //       //   id:0, 
  //       //   passageComponent: <Passage id={passages.length}/>
  //       // }
  //       <Passage id={passages.length} />
  //     ])
  //   }

  // }, [])

  console.log(`num of passages: ${passages.length}`)
  console.log(passages)
  return (
    <Box 
      elevation={3}
      sx={{
        paddingBlock:"1rem",
        paddingInline: '2rem',
        display:'flex',
        flexDirection:"column",
        // justifyContent: 'space-evenly',
        alignContent:'center',
        rowGap:'4rem',
        // overflowY: 'scroll',
        // minHeight: '100vh',
        // height: '100vh',
      }}
    >

      {/* <Box
        width={'100%'}
        overflowY={'scroll'}
        // height={'20vh'}
        display={'flex'}
        flexDirection={'column'}
        rowGap={'3rem'}
      > */}
      {/* <TransitionGroup> */}

        {
          passages.length > 0
          &&
          passages.map((passage, index)=>(
            <Passage key={passage.id}  id={passage.id} handleClose={deletePassage}/> // Pass deletePassage to each child
          ))
        }
      {/* </TransitionGroup> */}

      {/* </Box> */}
      <Button
        
        sx={{
          width: 'fit-content',
          alignSelf:'center'
        }}
        variant='contained'
        onClick={()=>{
          addPassage(
            {
              id: crypto.randomUUID(),
              component: <Passage id={crypto.randomUUID()}/>
            }
            
        )

        }}  
      >
        <PostAddIcon />
      </Button>
    </Box>
  )
}
