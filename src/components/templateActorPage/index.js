import React from "react";
import { useQuery } from "react-query";
import { getActorImages } from "../../api/tmdb-api";
import Grid from "@mui/material/Grid";
import { Card, CardMedia } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import ActorHeader from "../headerActor";
import Spinner from "../spinner";

const TemplateActorPage = ({ actor, children }) => {
    const { data, error, isLoading, isError } = useQuery(
      ["images", { id: actor.id }],
      getActorImages
    );

    if (isLoading)
      return <Spinner />;

    if (isError)
      return <h1>{error.message}</h1>;

    const images = data.profiles;

    return (
        <>
          <ActorHeader actor={actor} />
    
          <Grid container spacing={5} sx={{ padding: "15px" }}>
            <Grid item xs={4}>
              <Carousel>
              { images.map( (image) => 
                <Card key={image.file_path}>
                  <CardMedia
                      component="img"
                      image={'https://image.tmdb.org/t/p/w500/' + image.file_path}
                      alt={image.poster_path}
                      height="500"
                      title={image.file_path}
                      style={{
                          objectFit: "contain" 
                      }}
                  />
                </Card>
              ) }
              </Carousel>
            </Grid>
    
            <Grid item xs={8}>
              {children}
            </Grid>
          </Grid>
        </>
    );
}
export default TemplateActorPage;