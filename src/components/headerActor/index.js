import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";

const ActorHeader = (props) => {
    const actor = props.actor;
    const navigate = useNavigate();

    return (
        <Paper
        component="div"
        sx={{
          display: "flex",
          justifyContent: "space-around",
          flexWrap: "wrap",
          padding: 1.5,
          margin: 0,
        }}
      >
        <IconButton aria-label="go back" onClick={() => navigate(-1)}>
          <ArrowBackIcon color="primary" fontSize="large" />
        </IconButton>

        <IconButton aria-label="go forward" onClick={() => navigate(+1)}>
          <ArrowForwardIcon color="primary" fontSize="large" />
        </IconButton>
  
        <div style={{display: 'flex', alignItems: 'center', flexWrap: 'wrap', margin: "1rem"}}>
          <Typography variant="h4" component="h3">
            {actor.name}
            <br />
            <Typography variant="h5" gutterBottom>
                Biography
            </Typography>
            <Typography sx={{ fontSize: 12, m: 1 }} variant="subtitle1" gutterBottom>{`"${actor.biography}"`} </Typography>
          </Typography>
        </div>
      </Paper>
    );
};
export default ActorHeader;