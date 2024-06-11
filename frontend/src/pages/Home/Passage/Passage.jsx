import { Box, Card } from '@mui/material'
import React from 'react'
import { PassageInput } from './PassageInput'
import Picture from '../../../components/Picture/Picture'

export const Passage = () => {
  return (
    <Card
      sx={{
        padding:'1rem',
        width:'100%',
        display:"flex",
        justifyContent:'space-between',
        alignItems:'flex-start',
        columnGap:'2rem',
      }} 
      // width={'100%'}
      // display={"flex"}
      // justifyContent={'space-between'}
      // alignItems={'flex-end'}
      // columnGap={'2rem'}
    >
      <PassageInput />
      <Picture />
    </Card>
  )
}
