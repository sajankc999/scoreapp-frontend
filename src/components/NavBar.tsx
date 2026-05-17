import React from 'react'
import {AppBar,Toolbar,  Typography} from "@mui/material"

import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
function NavBar() {
  return (
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>{" "}
          <Typography variant="h6" noWrap component="div">
            Score App
          </Typography>
        </Toolbar>
      </AppBar>
 )
}

export default NavBar