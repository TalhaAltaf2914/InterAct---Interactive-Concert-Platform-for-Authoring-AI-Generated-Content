import { Backdrop, CircularProgress } from '@mui/material'
import React from 'react'

export const LoadingBackdrop = ({isLoading}) => {
  return (
    <Backdrop
        sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
        open={isLoading}
        // onClick={handleClose}
    >
        <CircularProgress color="inherit" />
    </Backdrop>
  )
}
