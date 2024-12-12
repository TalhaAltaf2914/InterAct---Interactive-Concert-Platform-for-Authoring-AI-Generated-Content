import { Box, Button, Card, CircularProgress, Fade } from '@mui/material'
import React, { useState } from 'react'
import { PassageInput } from './PassageInput'
import Picture from '../PictureSection/Picture'
import { PassageKeywords } from './PassageKeywords'
import { PictureSection } from '../PictureSection/PictureSection'
import CloseIcon from '@mui/icons-material/Close';
import { usePassagesStore } from '../../stores/PassagesStore/PassagesStore'

import axios from 'axios';

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
  const [passageInput, setPassageInput] = useState("");
  const [isLoading, setIsLoading] = useState(false)

  console.log(keywords)

  const generate = async() => {
    setIsLoading(true);

    axios.post(
      "http://localhost:1234/v1/completions",
      {
        "model": "Llama-3.1-8B",
        "prompt": passageInput,
        "max_tokens": 1600,
      }
    )
    .then(res =>{
      console.log(res.data.choices[0].text);
      setPassageInput(`${passageInput} ${res.data.choices[0].text}`)
    })
    .catch((error)=>{
      console.error(error)
    })
    .finally(()=>{
      // setIsLoading(false);
    });

    axios.post(
      "http://localhost:7865/sdapi/v1/txt2img",
      {
        "prompt": passageInput,
        "n_iter": 3,

      }
    )
    .then(res =>{
      console.log(res.data.images);
      setImages(res.data.images)
    })
    .catch((error)=>{
      console.error(error)
    })
    .finally(()=>{
      setIsLoading(false);
    });

  }

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
        <Box>

          {hasInput && <PassageInput passageInput={passageInput} setPassageInput={setPassageInput} setImages={setImages} keywords={keywords}/>}
          <Button 
              onClick={()=>generate()}
              variant='contained'
              disabled={passageInput.length === 0} 
              sx={{
                  gap:'0.3rem'
              }}
          >
              Generate Passage {isLoading && <CircularProgress sx={{color:'inherit'}} size={20}/>}
          </Button>
        </Box>
        {hasPicture && <PictureSection setImages={setImages} keywords={keywords} images={images}/>}
      </Box>

      {/* <Box></Box> */}
    </Card>
    </Fade>

  )
}
