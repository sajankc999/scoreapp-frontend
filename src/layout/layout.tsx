import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import {
  Box, Toolbar, CssBaseline
} from "@mui/material";
import SideBar from "../components/SideBar";


export default function Layout() {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <NavBar />

        <SideBar/>


      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Outlet />
      </Box> 
    </Box>
  );
}