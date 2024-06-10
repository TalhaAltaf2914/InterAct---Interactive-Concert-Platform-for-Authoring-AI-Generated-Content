import React from 'react'
import Navbar from '../NavBar/Navbar'
import Footer from '../Footer/Footer'
import { Card, Grid, Paper} from '@mui/material'
import {Outlet} from 'react-router-dom'
import { Sidebar } from '../Sidebar/Sidebar'

export const Layout = () => {
  return (
    <Grid 
        // sx={{margin:'0px'}}
        rowSpacing={3} 
        // gridTemplateRows={'repeat(3, 1fr)'}
        // gridTemplateRows={'auto 1fr auto'}
        // gridTemplateColumns={'1fr'}
        sx={{height: '100vh', overflow: ''}} 
        container
    >
        <Grid item 
        marginBottom={7} 
        xs={12}>
            <Navbar />
        </Grid>

        <Grid 
            
            item 
            container 
            direction='row'
            style={{flexGrow:1, overflow:'auto'}}
            columnSpacing={2} 

        >
            {/* <Grid item sx={{ display: { xs: 'none', md:'block' }, }} md={4}>
                <Sidebar />
            </Grid> */}
            <Grid item 
                xs={12} 
                md={12}
                // md={8}
            >
                <Outlet />
            </Grid>
        </Grid>
        <Grid 
            item 
            xs={12}
            style={{position: "fixed", bottom: 0}}
        >
            <Footer />
        </Grid>
    </Grid>
  )
}
