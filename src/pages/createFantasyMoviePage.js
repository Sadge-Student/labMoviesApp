import React, { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { useForm, Controller } from "react-hook-form";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Autocomplete from "@mui/material/Autocomplete";
import { getGenres } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { useAuth } from "../contexts/authContext";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";


const CreateFantasyMoviePage = (props) => {
    const { data, error, isLoading, isError } = useQuery("genres", getGenres);   
    const { signin, currentUser } = useAuth(); 
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);

    const [genre, setGenre] = useState('');
    const [date, setDate] = React.useState(dayjs());


    const handleChange = (newValue) => {
        setDate(newValue);
      };
    
    const handleSnackClose = (event) => {
    setOpen(false);
    // navigate("/fantasy-movies/");
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        // console.log(formData.get('movie-name'));
        // console.log(formData);
        const fantasyMovie = {
            movieName: formData.get('movie-name'),
            movieGenre: genre,
            movieOverview: formData.get('movie-overview'),
            movieReleaseDate: date.$d,
            movieImageURL: formData.get('movie-image-url')
        }
        addFantasyMovieSync(fantasyMovie);
        
    setOpen(true);
    };

    if (isLoading)
    return <Spinner />;
  
    const genres = data.genres;
    const genreName = [];
    for(var num in genres){
        genreName.push(genres[num].name)
    }

    async function addFantasyMovieSync(fantasyMovie) {
        try {
            addDoc(collection(db, `${currentUser.uid}/fantasy/movies`), {
                movieName: fantasyMovie.movieName,
                movieGenre: fantasyMovie.movieGenre,
                movieOverview: fantasyMovie.movieOverview,
                movieReleaseDate: fantasyMovie.movieReleaseDate,
                movieImageURL: fantasyMovie.movieImageURL
            });
            console.log("data sent correctly!");
        } catch (err) {
            console.error(err);
            return;
        }
    }

  return(
    <LocalizationProvider dateAdapter={AdapterDayjs}>
    <Box component="div" sx={{m: '0 20px 0 20px', minWidth: 'calc(100% - 40px);'}}>
      <Typography component="h2" variant="h3">
        Create a fantasy movie
      </Typography>
      <form onSubmit={handleSubmit} noValidate>
        <TextField
              sx={{ width: "40ch", m: '20px 0 0 0'}}
              variant="outlined"
              margin="normal"
              required
            //   onChange={onChange}
              name="movie-name"
              id="movie-name"
              label="Movie's Name"
              autoFocus
            />
        <TextField
            sx={{m: '20px 0 0 0'}}
            multiline
            fullWidth
            minRows={2}
            maxRows={4}
            variant="outlined"
            margin="normal"
            // required
            // onChange={onChange}
            // value={value}
            id="movie-overview"
            name="movie-overview"
            label="Movie's Overview"
        />

        <TextField
            sx={{ width: '40ch', m: '20px 0 0 0'}}
            variant="outlined"
            margin="normal"
            required
        //   onChange={onChange}
            name="movie-image-url"
            id="movie-image-url"
            label="Movie's Image URL"
        />
        
        <Autocomplete
            disablePortal
            id="movie-genre"
            name="movie-name"
            options={genreName}
            sx={{ width: '40ch', m: '20px 0 0 0' }}
            onChange={(event, value) => setGenre(value)}
            renderInput={(params) => <TextField {...params} label="Genre" />}
        />

        <DesktopDatePicker
          label="Release Date"
          inputFormat="DD/MM/YYYY"
          value={date}
          onChange={handleChange}
          renderInput={(params) => <TextField sx={{m: '20px 0 0 0'}} {...params} />}
        />

        <Box sx={{m: '20px 0 0 0'}}>
          <Button
            sx={{ m: 1}}
            type="submit"
            variant="contained"
            color="primary"
          >
            Create Fantasy Movie
          </Button>
          <Button
            type="reset"
            variant="contained"
            color="secondary"
          >
            Reset
          </Button>
        </Box>
      </form>
    </Box>
    </LocalizationProvider>
  );
};
export default CreateFantasyMoviePage;