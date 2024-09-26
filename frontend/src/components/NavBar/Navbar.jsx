import { 
  AppBar, 
  Avatar, 
  Box, Button, 
  Container, 
  IconButton, 
  Menu, MenuItem, 
  Paper, 
  Toolbar, Tooltip, 
  Typography,
} from '@mui/material'
import React from 'react'
import { NavLink } from 'react-router-dom';

const pages = ['About', 'Contact'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

export default function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    // <AppBar position='fixed'>
      
      <Container 
        
        maxWidth={'100%'} 
        sx={{
          position:'fixed',
          color:'white',
          backgroundColor:'Highlight',
          top:0,
          margin: '0px',
          padding:'1rem',
          // paddingRight:'113rem',
          display:"flex",
          justifyContent:'space-around',
          alignItems:'center',
          boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
          zIndex:'5'
        }}
        
      >
        {/* <Box> */}
          <NavLink
            to='/'
            style={{textDecoration:"none"}}
          >
            <Typography 
              variant='h5'
              fontWeight={'bold'}
            >
              InterAct
            </Typography >
          </NavLink>
        {/* </Box> */}

        {/* <Box 
          sx={{
            display:"flex",
            justifyContent:'space-between',
            alignItems:'center'
          }}
        >
          {
            pages.map((page, key)=>(
              <NavLink
                
                key={key}
                to={`/${page}`}
                style={{textDecoration:"none", display:"block"}}
              >
                <Typography 
                  variant='button'
                  
                >
                  {page}
                </Typography >
              </NavLink>
            ))
          }
          
        </Box> */}
      </Container>
    // </AppBar>
  )
}
