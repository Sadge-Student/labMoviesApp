import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Header from "../headerMovieList";
import ActorList from "../actorList";

function ActorListPageTemplate( { actors, title, action }) {
    const [nameFilter, setNameFilter] = useState("");
    
    return (
        <Grid container sx={{ padding: '20px'}}>
            <Grid item xs={12}>
                <Header title={title} />
            </Grid>
            <Grid item container spacing={5}>
                <ActorList action={action} actors={actors}></ActorList>
            </Grid>
        </Grid>
    )
}
export default ActorListPageTemplate;