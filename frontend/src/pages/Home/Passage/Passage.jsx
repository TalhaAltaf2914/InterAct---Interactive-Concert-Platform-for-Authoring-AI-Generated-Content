import { Box } from '@mui/material'
import React from 'react'
import { PassageInput } from './PassageInput'

export const Passage = () => {
  return (
    <Box
        width={'100%'}
        display={"flex"}
        justifyContent={'space-between'}
        alignItems={'center'}

    >
        <PassageInput />
        <Box>
            picture
        </Box>
    </Box>
  )
}
