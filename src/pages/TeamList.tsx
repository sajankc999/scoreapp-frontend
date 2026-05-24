import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box, Container } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Margin } from "@mui/icons-material";
import IconButton from '@mui/material/IconButton';
import EditTeamModalBtn from "../components/EditTeamModal"
import AddTeamBthn from "../components/AddTeamModal"
import { useEffect, useState } from "react";

// const TeamListDummyData = [
//   {
//     id:"1",
//     name: "Team A",
//     image:
//       "https://media.istockphoto.com/id/458408183/photo/futbol-club-barcelonas-official-shop-and-insignia.jpg?s=2048x2048&w=is&k=20&c=1tAre7HJFP8gEb4Ak-zbxj01nWtVgzWCDae9L7SMy_s=",
//   },
//   {
//     id:"2",
//     name: "Team B",
//     image:
//       "https://media.istockphoto.com/id/458408183/photo/futbol-club-barcelonas-official-shop-and-insignia.jpg?s=2048x2048&w=is&k=20&c=1tAre7HJFP8gEb4Ak-zbxj01nWtVgzWCDae9L7SMy_s=",
//   },
//   {
//     id:"3",
//     name: "Team C",
//     image:
//       "https://media.istockphoto.com/id/458408183/photo/futbol-club-barcelonas-official-shop-and-insignia.jpg?s=2048x2048&w=is&k=20&c=1tAre7HJFP8gEb4Ak-zbxj01nWtVgzWCDae9L7SMy_s=",
//   },
//   {
//     id:"4",
//     name: "Team D",
//     image:
//       "https://media.istockphoto.com/id/458408183/photo/futbol-club-barcelonas-official-shop-and-insignia.jpg?s=2048x2048&w=is&k=20&c=1tAre7HJFP8gEb4Ak-zbxj01nWtVgzWCDae9L7SMy_s=",
//   },
  // {
  //   id:"",
  //   name: "Team E",
  //   image:
  //     "https://media.istockphoto.com/id/458408183/photo/futbol-club-barcelonas-official-shop-and-insignia.jpg?s=2048x2048&w=is&k=20&c=1tAre7HJFP8gEb4Ak-zbxj01nWtVgzWCDae9L7SMy_s=",
  // },
  // {
  //   id:"",
  //   name: "Team E",
  //   image:
  //     "https://media.istockphoto.com/id/458408183/photo/futbol-club-barcelonas-official-shop-and-insignia.jpg?s=2048x2048&w=is&k=20&c=1tAre7HJFP8gEb4Ak-zbxj01nWtVgzWCDae9L7SMy_s=",
  // },
  // {
  //   name: "Team E",
  //   image:
  //     "https://media.istockphoto.com/id/458408183/photo/futbol-club-barcelonas-official-shop-and-insignia.jpg?s=2048x2048&w=is&k=20&c=1tAre7HJFP8gEb4Ak-zbxj01nWtVgzWCDae9L7SMy_s=",
  // },
  // {
  //   name: "Team E",
  //   image:
  //     "https://media.istockphoto.com/id/458408183/photo/futbol-club-barcelonas-official-shop-and-insignia.jpg?s=2048x2048&w=is&k=20&c=1tAre7HJFP8gEb4Ak-zbxj01nWtVgzWCDae9L7SMy_s=",
  // },
  // {
  //   id:"",
  //   name: "Team E",
  //   image:
  //     "https://media.istockphoto.com/id/458408183/photo/futbol-club-barcelonas-official-shop-and-insignia.jpg?s=2048x2048&w=is&k=20&c=1tAre7HJFP8gEb4Ak-zbxj01nWtVgzWCDae9L7SMy_s=",
  // },
  // {
  //   id:"",
  //   name: "Team E",
  //   image:
  //     "https://media.istockphoto.com/id/458408183/photo/futbol-club-barcelonas-official-shop-and-insignia.jpg?s=2048x2048&w=is&k=20&c=1tAre7HJFP8gEb4Ak-zbxj01nWtVgzWCDae9L7SMy_s=",
  // },
  // {
  //   id:"",
  //   name: "Team E",
  //   image:
  //     "https://media.istockphoto.com/id/458408183/photo/futbol-club-barcelonas-official-shop-and-insignia.jpg?s=2048x2048&w=is&k=20&c=1tAre7HJFP8gEb4Ak-zbxj01nWtVgzWCDae9L7SMy_s=",
  // },
  // {
  //   id:"",
  //   name: "Team E",
  //   image:
  //     "https://media.istockphoto.com/id/458408183/photo/futbol-club-barcelonas-official-shop-and-insignia.jpg?s=2048x2048&w=is&k=20&c=1tAre7HJFP8gEb4Ak-zbxj01nWtVgzWCDae9L7SMy_s=",
  // },
// ];



export default function TeamList() {
  const [teams,setTeams]= useState<any[]>([]);

    async function loadDataFromFile() {
      const data = await window.electronAPI.readTeam();
      console.log("teams data read from file::",data);
      setTeams(data.team_list);
    }

    useEffect(() => {
    loadDataFromFile();
  }, []);

  const handleDelete = (team_id:String) =>{
    console.log("what is e:",team_id);
    // delete TeamListDummyData.team_id
  }
  return (
    <Box maxWidth="100%" >
      <Box marginBottom={8} textAlign="center">
        <Typography variant="h3">Team List</Typography>
        <Box textAlign="right" >
         <AddTeamBthn/>
        </Box>
      </Box>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: 4,
        }}
      >
        {teams.length>0?teams.map((team_data:any) => (
          <Card sx={{  width: "100%" }} key={team_data.id}>
            <CardMedia
              sx={{ height: 140 }}
              image={team_data.image}
              title="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {team_data.name ? team_data.name : "Unknown"}
              </Typography>
              <EditTeamModalBtn/>
              <IconButton onClick={()=>handleDelete(team_data.id)}>
              <DeleteIcon/>

              </IconButton>
            </CardContent>
          </Card>
        )):<Typography>Add teams here.</Typography>}
      </Box>
    </Box>
  );
}
