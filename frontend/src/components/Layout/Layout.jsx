import React, { useEffect } from 'react'
import Navbar from '../NavBar/Navbar'
import Footer from '../Footer/Footer'
import { Card, Grid, Paper} from '@mui/material'
import {Outlet, useLocation} from 'react-router-dom'
import { Sidebar } from '../Sidebar/Sidebar'

import { useLoadingStore } from '../../stores/LoadingStore/LoadingStore'
import { LoadingBackdrop } from '../LoadingBackdrop/LoadingBackdrop'

export const Layout = () => {
    const {isLoading, setIsLoading} = useLoadingStore();
    const location = useLocation();
    console.log(location)
    useEffect(()=>{
        setTimeout(()=>{setIsLoading(false);}, 1000);
    }, [isLoading])


  return (
    <Grid 
        // sx={{margin:'0px'}}
        rowSpacing={3} 
        // gridTemplateRows={'repeat(3, 1fr)'}
        // gridTemplateRows={'auto 1fr auto'}
        // gridTemplateColumns={'1fr'}
        sx={{
            // height: '100vh', 
            overflow: '',
        }}
        container
    >
        <LoadingBackdrop isLoading={isLoading} />

        <Grid 
            item 
            marginBottom={10} 
            xs={12}
        >
            <Navbar />
        </Grid>

        <Grid 
            
            item 
            container 
            direction='row'
            style={{flexGrow:1, overflow:'auto', minHeight:'90vh'}}
            columnSpacing={2} 
            paddingInline={'5rem'} 
            xs={12}

        >
            {/* <Grid item sx={{ display: { xs: 'none', md:'block' }, }} md={4}>
                <Sidebar />
            </Grid> */}
            <Grid item 
                xs={12} 
                md={12}
                xl={8}
            >
                <Outlet />
            </Grid>
        </Grid>
        <Grid 
            item 
            xs={12}
            
            style={{position: "sticky", bottom: 0}}
        >
            <Footer />
        </Grid>
    </Grid>
  )
}
