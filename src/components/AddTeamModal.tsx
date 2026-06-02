import * as React from "react";
import { Box, Modal, Button, IconButton, TextField, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { readTeam, writeTeam } from "../fileService";

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

function AddTeamBtm() {
  const isElectron = !!window.electronAPI
  const [formData, setFormData] = React.useState({
  name: "",
  image: "",
  });

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  async function saveTeamData(name: string, imageFile: File | null) {
    if (!name) {
      console.error("Team name is required");
      return;
    }

    let imagePath = "";

    try {
      if (isElectron && imageFile) {
        const buffer = await imageFile.arrayBuffer();
        const fileName = `${Date.now()}_${imageFile.name}`;
        // saveImage returns the saved file path from main
        imagePath = await window.electronAPI.saveImage(fileName, buffer);
      }

      const data = await readTeam();
      if (!data || typeof data !== 'object') {
        // initialize structure if missing
        data.team_list = [];
      }
      if (!Array.isArray(data.team_list)) data.team_list = [];

      const newTeam = {
        id: String(Date.now()),
        name,
        image: imagePath,
      };

      data.team_list.push(newTeam);

      await writeTeam(data);
    } catch (err) {
      console.error('Failed to save team:', err);
    }
  }

  const handleChange = (e:any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>)  => {
    e.preventDefault();
    // console.log(formData);
    handleClose();
    
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const imageFile = (formData.get("image") as File) || null;
    await saveTeamData(name, imageFile);
    
  };

  return (
    <>
      <IconButton onClick={handleOpen}>
        <AddIcon />
      </IconButton>

      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>

          {/* Title */}
          <Typography variant="h6">Add Team</Typography>

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
            {isElectron ? (
              <TextField
                type="file"
                name="image"
                inputProps={{ accept: "image/*" }}
                fullWidth
              />
            ) : (
              <></>
            )}

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

export default AddTeamBtm;