import React from "react";
import Grid from "@mui/material/Grid";
import FantasyMovieHeader from "../fantasyMovieHeader";

const TemplateFantasyMoviePage = ({ movie, children }) => {

    return (
        <>
          <FantasyMovieHeader movie={movie} />
    
          <Grid container spacing={5} sx={{ padding: "15px" }}>
            <Grid item xs={4}>

            </Grid>
    
            <Grid item xs={8}>
              {children}
            </Grid>
          </Grid>
        </>
    );
}
export default TemplateFantasyMoviePage;