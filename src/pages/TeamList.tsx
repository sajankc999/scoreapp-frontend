import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import EditTeamModalBtn from "../components/EditTeamModal";
import AddTeamBthn from "../components/AddTeamModal";
import { useEffect, useState } from "react";
import DeleteTeamModalBtn from "../components/DeleteTeamModalBtn";
export default function TeamList() {
  const [teams, setTeams] = useState<any[]>([]);
  const [nextID, setNextID] = useState<number>(0);

  async function loadDataFromFile() {
    const data = await window.electronAPI.readTeam();

    const teamsWithImages = await Promise.all(
      data.team_list.map(async (team: any) => ({
        ...team,
        imageSrc: team.image
          ? team.image.startsWith("http://") ||
            team.image.startsWith("https://")
            ? team.image
            : await window.electronAPI.getImage(team.image)
          : "",
      })),
    );

    setTeams(teamsWithImages);

    if (teamsWithImages.length > 0) {
      const lastID = Number(teamsWithImages[teamsWithImages.length - 1].id);

      setNextID(Number(lastID + 1));
    } else {
      setNextID(1);
    }
  }

  useEffect(() => {
    loadDataFromFile();
  }, []);



  const handleUpdate = async ()=> {
    await loadDataFromFile();
  }

  return (
    <Box maxWidth="100%">
      <Box marginBottom={8} textAlign="center">
        <Typography variant="h3">Team List</Typography>

        <Box textAlign="right">
          <AddTeamBthn nextId={nextID} />
        </Box>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: 4,
        }}
      >
        {teams.length > 0 ? (
          teams.map((team) => (
            <Card key={team.id} sx={{ width: "100%" }}>
              <CardMedia
                component="img"
                height="140"
                image={team.imageSrc}
                alt={team.name}
              />

              <CardContent>
                <Typography gutterBottom variant="h5">
                  {team.name || "Unknown"}
                </Typography>

                <EditTeamModalBtn team={team} onUpdate={handleUpdate} />

                <DeleteTeamModalBtn delete_team_id={team.id} teamData={teams}/>
              </CardContent>
            </Card>
          ))
        ) : (
          <Typography>Add teams here.</Typography>
        )}
      </Box>
    </Box>
  );
}
