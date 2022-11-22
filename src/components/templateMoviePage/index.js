import React from "react";
import { useQuery } from "react-query";
import { getMovieImages } from "../../api/tmdb-api";
import Carousel from "react-material-ui-carousel";
import Grid from "@mui/material/Grid";
import { Card, CardMedia } from "@mui/material";
import MovieHeader from "../headerMovie";
import Spinner from "../spinner";

const TemplateMoviePage = ({ movie, children }) => {
    const { data, error, isLoading, isError } = useQuery(
      ["images", { id: movie.id }],
      getMovieImages
    );

    if (isLoading)
      return <Spinner />;

    if (isError)
      return <h1>{error.message}</h1>;

    const images = data.posters;

    return (
        <>
          <MovieHeader movie={movie} />
    
          <Grid container spacing={5} sx={{ padding: "15px" }}>
            <Grid item xs={4}>
              <Carousel>
              { images.map( (image) => 
                <Card>
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
export default TemplateMoviePage;