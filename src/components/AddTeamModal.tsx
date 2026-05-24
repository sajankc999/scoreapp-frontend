import * as React from "react";
import { Box, Modal, Button, IconButton, TextField, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

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

  function saveTeamData(data:any){
      //convert form data to json
      const jsonString = JSON.stringify(data);
      console.log("from save team data function",jsonString)
    
    //save it with writeTeam function
  }

  const handleChange = (e:any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e:any) => {
    e.preventDefault();
    console.log(formData);
    saveTeamData(formData)
    handleClose();
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
            {isElectron?
            <TextField
            slotProps={{
                input: {
                inputProps: {
                    accept:"image/*"
                    },
                },
            }}
              type= "file"
              name="image"
              value={formData.image}
              onChange={handleChange}
              fullWidth
            />:<></>
            }

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