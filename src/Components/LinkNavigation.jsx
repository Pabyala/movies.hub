import React, { useState } from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { Link } from "react-router-dom";
import './LinkNavigationStyle.css'

export default function LinkNavigation() {
  const [value, setValue] = useState(0);
  
  return (
    <Box>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
          window.scroll(0, 0);
        }}
      >
        <BottomNavigationAction 
          label="Trending"
          LinkComponent={Link}  
          to='/trending'
        />
        <BottomNavigationAction 
          label="Movies"  
          LinkComponent={Link}
          to='/movies'
        />
        <BottomNavigationAction 
          label="TV Series"  
          LinkComponent={Link}
          to='/series'
        />
      </BottomNavigation>
    </Box>
  );
}

