import { Box, Button, ButtonGroup, Card, TextField } from '@mui/material'
import React from 'react'

export const PassageInput = () => {
  return (
    <Card
        sx={{
            padding:'1rem',
            paddingTop: '0.5rem',
            width:'70%'
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
                    <Button>{"<-"}</Button>
                    <Button>{"->"}</Button>
                </ButtonGroup>
            </Box>
        </Box>
    </Card>
  )
}
