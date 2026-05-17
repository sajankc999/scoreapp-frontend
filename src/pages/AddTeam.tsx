import React from 'react'
import {
  Box,
  Toolbar,
  Typography,
} from "@mui/material";

function AddTeam() {
  return (
    <Box sx={{ display: "flex" }}>

      {/* Main content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Typography>TeamList</Typography>
      </Box>
    </Box>
  )
}

export default AddTeam