import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import type {TeamData,Team} from "../types"
import { writeTeam } from "../fileService";
import {
  Box,
  Modal,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import { Margin } from "@mui/icons-material";


const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 3,

  display: "flex",
  flexDirection: "column",
  gap: 2,
};
type DeleteTeamModalBtnProps={
    delete_team_id:Number,
    teamData:Team[]
}

function DeleteTeamModalBtn({delete_team_id,teamData}:DeleteTeamModalBtnProps) {

    const handleDelete=async ()=>{
        let new_list = teamData.filter((team_obj:Team)=>
            team_obj.id !==delete_team_id
        )
        await writeTeam({
        team_list: new_list,
        }); 
        handleClose()   
    }

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
    <IconButton onClick={() => handleOpen()}>
      <DeleteIcon />
    </IconButton>


      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Box>
              <Typography>
                  Are you sure? The changes cannot be reverted.
              </Typography>


            <Box sx={{margin:"20px",alignItems:"center"}}>

              <Button variant="contained" color="success" onClick={handleClose}>
                Back
              </Button>

              <Button variant="outlined" color="error" onClick={handleDelete}>
                Continue
              </Button>
            </Box>
            </Box>

        </Box>
      </Modal>
    </>
  );
}

export default DeleteTeamModalBtn;
