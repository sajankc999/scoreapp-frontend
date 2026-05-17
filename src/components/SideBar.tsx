import React from 'react'
import {
  Box,
  Toolbar,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
} from "@mui/material";

import { Link } from "react-router-dom";
const drawerWidth = 240;

const DashBoardApps = [
    {"name":"DashBoard","path":'/dashboard'},
    {"name":"Teams","path":'/team-list'},
    {"name":"Fixtures","path":'/fixtures'},
    {"name":"Add Team","path":'/add-team'},
    {"name":"Settings","path":'/settings'}
              ]

function SideBar() {
  return (
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            {DashBoardApps.map((obj) => (
      <ListItem key={obj.name} disablePadding>
        <ListItemButton component={Link} to={obj.path}>
          <ListItemText primary={obj.name} />
        </ListItemButton>
      </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
)
}

export default SideBar