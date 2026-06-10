import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import type {TeamData,Team} from "../types"
import { writeTeam } from "../fileService";

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
    }
  return (
    <IconButton onClick={() => handleDelete()}>
      <DeleteIcon />
    </IconButton>
  );
}

export default DeleteTeamModalBtn;
