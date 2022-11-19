import React, { useState } from "react";
import Header from "../headerMovieList";
import ActorList from "../actorList";
import Grid from "@mui/material/Grid";

function ActorListPageTemplate( { actors, title, action }) {
    const [nameFilter, setNameFilter] = useState("");
    
    return (
        <Grid container sx={{ padding: '20px'}}>
            <Grid item xs={12}>
                <Header title={title} />
            </Grid>
            <ActorList action={action} actors={actors}></ActorList>
        </Grid>
    )
}
export default ActorListPageTemplate;