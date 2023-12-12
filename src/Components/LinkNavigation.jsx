import React, { useState } from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { Link } from "react-router-dom";
import './LinkNavigationStyle.css'

export default function LinkNavigation() {
  const [value, setValue] = useState(0);
  
  return (
    <Box className='box-link'>
      <BottomNavigation
        className='box-btnNav'
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
          window.scroll(0, 0);
        }}
      >
        <BottomNavigationAction 
          className='links'
          label="Trending"
          LinkComponent={Link}  
          to='/'
        />
        <BottomNavigationAction 
          className='links'
          label="Movies"  
          LinkComponent={Link}
          to='/movies'
        />
        <BottomNavigationAction 
          className='links'
          label="TV Series"  
          LinkComponent={Link}
          to='/series'
        />
      </BottomNavigation>
    </Box>
  );
}

