import { Box, Button, ButtonGroup, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'
import React from 'react'
const words = [
    'Phones',
    'Flashlight',
    'Shoes',
    'Mouse',
    'Headphones',
    'Books',
    'Cups',
  
  ]

export const PassageKeywords = ({keywords, selectedKeywords, setSelectedKeywords}) => {

// const [selectedKeywords, setSelectedKeywords] = React.useState(() => []);

  const handleFormat = (event, newselectedKeywords) => {
    setSelectedKeywords(newselectedKeywords);
  };

//   console.log(selectedKeywords)
  return (
    <Box
        width={'100%'}
        component="section"
        // position={'sticky'}
        // top={'0px'}
      >
        {/* <Typography
          variant='h6'
        >
          Keywords
        </Typography> */}

        <ToggleButtonGroup 
        //   variant="button" 
            color='primary'
            value={selectedKeywords}
            onChange={handleFormat}
        >
          {/* {
            words.map((word, key)=>(
              <ToggleButton key={key} value={word}>{word}</ToggleButton >
            ))
          } */}
          {
            
          keywords.map((word, key)=>(
              <ToggleButton key={key} value={word}>{word}</ToggleButton >
            ))
          }
        </ToggleButtonGroup>
      </Box>
  )
}
