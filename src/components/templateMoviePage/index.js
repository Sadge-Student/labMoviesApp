import React, { useState, useEffect } from "react"
import MovieHeader from "../headerMovie"
import Grid from "@mui/material/Grid"
import ImageList from "@mui/material/ImageList"
import ImageListItem from "@mui/material/ImageListItem"
import { getMovieImages } from "../../api/tmdb-api"
import { useQuery } from "react-query"
import Spinner from "../spinner"
import Carousel from 'react-material-ui-carousel'
import { Card, CardMedia } from '@mui/material'

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
            {/* <Grid item xs={3}>
              <div sx={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-around",
              }}>
                <ImageList 
                    cols={1}>
                    {images.map((image) => (
                        <ImageListItem key={image.file_path} cols={1}>
                        <img
                            src={`https://image.tmdb.org/t/p/w500/${image.file_path}`}
                            alt={image.poster_path}
                        />
                        </ImageListItem>
                    ))}
                </ImageList>
              </div>
            </Grid> */}
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