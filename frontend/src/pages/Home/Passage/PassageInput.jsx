import { Box, Button, ButtonGroup, Card, TextField } from '@mui/material'
import React from 'react'

import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
export const PassageInput = () => {
  return (
    <Box
        sx={{
            padding:'1rem',
            paddingTop: '0.5rem',
            width:'70%',
            minWidth:'300px'
        }}
    >

        <Box
            display={'flex'}
            flexDirection={'column'}
            rowGap={'0.5rem'}    
        >
            <TextField
                // label="Multiline"
                multiline
                rows={5}
                fullWidth
                
                placeholder="A potato flew around my room..."
                variant="filled"
            />

            <Box
                display={'flex'}
                justifyContent={'space-between'}
                alignItems={'center'}
            >
                <Button variant='contained'>
                    Generate Passage
                </Button>
                
                <ButtonGroup variant="outlined">
                    <Button><NavigateBeforeIcon /></Button>
                    <Button><NavigateNextIcon /></Button>
                </ButtonGroup>
            </Box>
        </Box>
    </Box>
  )
}
