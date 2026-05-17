import {
  Box,
  Toolbar,
  Typography,
} from "@mui/material";




export default function Dashboard() {
  return (
    <Box sx={{ display: "flex" }}>

      {/* Main content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Typography>DashBoard</Typography>
      </Box>
    </Box>
  );
}
