import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { useParams } from 'react-router-dom';
import { getMovies } from "../api/tmdb-api";
import PageTemplate from "../components/templateMovieListPage";
import AddToFavouritesIcon from "../components/cardIcons/addToFavourites";
import AddToMustWatch from "../components/cardIcons/addToMustWatch";
import Spinner from "../components/spinner";
import Button from "@mui/material/Button";
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid'

const HomePage = (props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, error, isLoading, isError, refetch } = useQuery('discover',() => getMovies(currentPage));

  useEffect(() => {
    refetch();
    topFunction();
  }, [currentPage, refetch])

  function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }

  if (isLoading)
    return <Spinner />;

  if (isError)
    return <h1>{error.message}</h1>;

  const movies = data.results;

  const favourites = movies.filter(m => m.favourite)
  localStorage.setItem('favourites', JSON.stringify(favourites))
  const addToFavourites = (movieId) => true

  return(
    <>
    <div style={{paddingTop: '30px'}}>
        <Grid container spacing={8}>
          <Grid item xs={12}>
            <Grid container justifyContent="center" spacing={2}>
              <Button disabled={currentPage === 1} variant="outlined" startIcon={<NavigateBeforeIcon />} onClick={() => setCurrentPage(prevValue => prevValue - 1 )} style={{margin: '0 10px'}}>Previous Page</Button>
              
              <TextField 
                id="standard-basic" 
                label="Page Search" 
                inputProps={{min: 0, style: { textAlign: 'center' }}}
                variant="standard"
                style={{margin: '0 10px'}} 
                onKeyPress={(ev) => {
                  if (ev.key === 'Enter') {
                    if (!isNaN(ev.target.value) && ev.target.value <= 500 && ev.target.value > 0) {
                      setCurrentPage(ev.target.value);
                      ev.preventDefault();
                    }
                  }
                }}
              />
              
              <Button disabled={currentPage === 500} variant="outlined" endIcon={<NavigateNextIcon />} onClick={() => setCurrentPage(prevValue => prevValue + 1 )}>Next Page</Button>
            </Grid>
          </Grid>
        </Grid>
      </div>

       {!isLoading && <PageTemplate
          title={`Discover Movies Page: ${currentPage}`}
          movies={movies}
          action={(movie) => {
            return (
            <>
              <AddToFavouritesIcon movie={movie} />
              <AddToMustWatch movie={movie} />
            </>
            );
          }}
        />
      }

      <div style={{padding: 20}}>
        <Grid container spacing={8}>
          <Grid item xs={12}>
            <Grid container justifyContent="center" spacing={2}>
              <Button disabled={currentPage === 1} variant="outlined" startIcon={<NavigateBeforeIcon />} onClick={() => setCurrentPage(prevValue => prevValue - 1 )} style={{margin: '0 10px'}}>Previous Page</Button>
              
              <TextField 
                id="standard-basic" 
                label="Page Search" 
                inputProps={{min: 0, style: { textAlign: 'center' }}}
                variant="standard"
                style={{margin: '0 10px'}} 
                onKeyPress={(ev) => {
                  if (ev.key === 'Enter' && ev.target.value <= 500 && ev.target.value > 0) {
                    if (!isNaN(ev.target.value)) {
                      setCurrentPage(ev.target.value);
                      ev.preventDefault();
                    }
                  }
                }}
              />
              
              <Button disabled={currentPage === 500} variant="outlined" endIcon={<NavigateNextIcon />} onClick={() => setCurrentPage(prevValue => prevValue + 1 )}>Next Page</Button>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </>
  );
};
export default HomePage;