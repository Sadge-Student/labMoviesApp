import React from "react";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Typography from "@mui/material/Typography"
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import CakeIcon from "@mui/icons-material/Cake";
import WorkIcon from '@mui/icons-material/Work';
import LinkIcon from "@mui/icons-material/Link";
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';


const root = {
    display: "flex",
    flexWrap: "wrap",
    listStyle: "none",
    padding: 1.5,
    margin: 0,
    flexDirection: "column",
};

const root1 = {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: 1.5,
    margin: 0,
};
const chip = { margin: 0.5, maxWidth: "20%" };

const chip1 = { margin: 0.5 };

const ActorDetails = ({ actor }) => {

  return (
    <>
      <Typography variant="h5" component="h5">
        Overview
      </Typography>
      <Paper component="ul" sx={root}>
        <Tooltip title="Location Born" placement="right-start" arrow>
            <Chip component="li" icon={<LocationOnIcon />} label={`${actor.place_of_birth}`} sx={chip}/>
        </Tooltip>
        <Tooltip title="Birthday" placement="right-start" arrow>
            <Chip component="li" icon={<CakeIcon />} label={`${actor.birthday}`} sx={chip}/>
        </Tooltip>
        {actor.deathDay !== undefined && 
        <Tooltip title="Death Date" placement="right-start" arrow>
            <Chip component="li" icon={<SentimentVeryDissatisfiedIcon />} label={`${actor.deathDay}`} sx={chip}/>
        </Tooltip>
        }
        <Tooltip title="Department" placement="right-start" arrow>
            <Chip component="li" icon={<WorkIcon />} label={`${actor.known_for_department}`} sx={chip}/>
        </Tooltip>
      </Paper>
      
      <Paper component="ul" sx={root}>
      <Typography sx={{ fontSize: 18, m: 1 }} variant="subtitle1" gutterBottom>
        Links
      </Typography>
        <a target="_blank" rel="noreferrer" href={`https://www.imdb.com/name/${actor.imdb_id}`} style={{textDecoration: 'none'}}>
          <Button variant="contained" endIcon={<LinkIcon />}>IMDB</Button>
        </a>
      </Paper>

      <Paper 
        component="ul" 
        sx={root1}
      >
        <li>
          <Chip label="Also Known As" sx={chip1} color="primary" />
        </li>
        {actor.also_known_as.map((aka) => (
          <li key={aka}>
            <Chip label={aka} sx={chip1} />
          </li>
        ))}
      </Paper>
    </>
  );
};
export default ActorDetails;