import { Box, Button, Card, Fade } from '@mui/material'
import React, { useState } from 'react'
import { PassageInput } from './PassageInput'
import Picture from '../PictureSection/Picture'
import { PassageKeywords } from './PassageKeywords'
import { PictureSection } from '../PictureSection/PictureSection'
import CloseIcon from '@mui/icons-material/Close';
import { usePassagesStore } from '../../stores/PassagesStore/PassagesStore'
export const Passage = (
  {
    id=0,
    hasPicture=true,
    hasKeywords=true,
    hasInput=true,
    handleClose = (id) => {},
  }
) => {

  const {passages} = usePassagesStore();

  const [images, setImages] = useState([]);
  const [keywords, setKeywords] = useState(() => []);

  console.log(keywords)

  return (
    
    <Fade in>

    <Card
    id={id}
      sx={{
        padding:'1rem',
        width:'90%',
        minWidth:'fit-content',
        display:"flex",
        flexDirection: 'column',
        justifyContent:'space-between',
        alignItems:'flex-start',
        columnGap:'2rem',
      }} 
    >
      <Box
        width={'100%'}
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'flex-start'}
      >
        { hasKeywords && <PassageKeywords keywords={keywords} setKeywords={setKeywords}/> }
        
        <Button 
          variant='text'
          disabled={passages.length <= 1}
        onClick={(e)=>{
          // e.preventDefault();
          console.log(`Deleting passage with id: ${id}`)
          handleClose(id)
        }}>
          <CloseIcon />
        </Button>
      </Box>

      <Box 
        sx={{
          // padding:'1rem',
          // width:'fit-content',
          width:'100%',
          display:"flex",
          justifyContent:'space-between',
          alignItems:'flex-start',
          columnGap:'2rem',
        }}
      >
        {hasInput && <PassageInput setImages={setImages} keywords={keywords}/>}
        {hasPicture && <PictureSection setImages={setImages} keywords={keywords} images={images}/>}
      </Box>

      {/* <Box></Box> */}
    </Card>
    </Fade>

  )
}
