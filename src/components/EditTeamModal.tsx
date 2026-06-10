import * as React from "react";
import {
  Box,
  Modal,
  Button,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { writeTeam, readTeam } from "../fileService";
import type {Team,TeamData} from "../types";

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

type EditTeamModalBtnProps = {
  team: Team;
  onUpdate: () => Promise<void> | void;
};

function EditTeamModalBtn({ team,onUpdate }:EditTeamModalBtnProps) {
  const [formData, setFormData] = React.useState({
    name: "",
    image: "",
  });

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  async function EditDataJson(name:string,imageFile:File | null) {
    try{
    let teamData = await readTeam();

    // save the image first
    let imagePath = "";

    try {
      if (imageFile) {
        const buffer = await imageFile.arrayBuffer();
        const fileName = `${Date.now()}_${imageFile.name}`;
        // saveImage returns the saved file path from main
        imagePath = await window.electronAPI.saveImage(fileName, buffer);
      }
    } catch(e){
      console.log(e);
    }

    const UpdatedTeam = {
      id: team.id,
      name: name,
      image: imagePath
    }
    teamData.team_list = teamData.team_list.map((team_obj:Team) =>
      team_obj.id === team.id
        ? { ...team_obj, ...UpdatedTeam}
        : team_obj
    );
    
    console.log(teamData);
    await writeTeam(teamData);
    } catch(err){
      console.log("error at edit team modal",err);
    }


    
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const imageFile = (formData.get("image") as File) || null;
    EditDataJson(name,imageFile);
    await onUpdate();
    handleClose();
  };

  React.useEffect(()=>{
  if (team) {
    setFormData({
      name: team.name ?? "",
      image: team.image ?? "",
    });
  }
  },[team,open]);

  return (
    <>
      <IconButton onClick={handleOpen}>
        <EditIcon />
      </IconButton>

      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          {/* Title */}
          <Typography variant="h6">Edit Team</Typography>

          {/* Form */}
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              flexGrow: 1,
            }}
          >
            <label htmlFor="name">Name</label>
            <TextField
              //   label="Team Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              fullWidth
            />

            <TextField
              slotProps={{
                input: {
                  inputProps: {
                    accept: "image/*",
                  },
                },
              }}
              type="file"
              name="image"
              onChange={handleChange}
              fullWidth
            />

            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                gap: 1,
                mt: "auto",
              }}
            >
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="submit" variant="contained">
                Save
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  );
}

export default EditTeamModalBtn;
