import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

const FantasyMovieHeader = (props) => {
    const movie = props.movie;
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
  
        <div style={{margin: "1rem 10%"}}>
          <Typography variant="h4" component="h3">
            {movie.movieName}
          </Typography>
            
          <Typography variant="h5" component="h5" gutterBottom>
              Biography
          </Typography>
          <Typography sx={{ fontSize: 12, m: 1 }} variant="subtitle1" gutterBottom>{`"${movie.movieOverview}"`} </Typography>
        </div>
      </Paper>
    );
};
export default FantasyMovieHeader;