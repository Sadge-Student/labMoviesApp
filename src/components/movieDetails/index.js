import React, {useState} from "react";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MonetizationIcon from "@mui/icons-material/MonetizationOn";
import StarRate from "@mui/icons-material/StarRate";
import NavigationIcon from "@mui/icons-material/Navigation";
import Fab from "@mui/material/Fab";
import Typography from "@mui/material/Typography";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import LinkIcon from "@mui/icons-material/Link";
import MovieReviews from "../movieReviews";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import img from "../../images/no-image.png";
import Grid from "@mui/material/Grid";
import { getMovieCredits } from "../../api/tmdb-api";
import Tooltip from "@mui/material/Tooltip";
import StarRateIcon from "@mui/icons-material/StarRate";
import Tilt from "react-parallax-tilt";
import CardContent from "@mui/material/CardContent";
import Spinner from "../spinner";
import Avatar from "@mui/material/Avatar";
import FavoriteIcon from "@mui/icons-material/Favorite";

const root = {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: 1.5,
    margin: 0,
};
const chip = { margin: 0.5 };

const MovieDetails = ({ movie }) => {
  const { data, error, isLoading, isError } = useQuery(
    ["credits", { id: movie.id }],
    getMovieCredits
  );

  const [drawerOpen, setDrawerOpen] = useState(false);

  if (isLoading)
    return <Spinner />

  if (isError)
    return <h1>{error.message}</h1>

  const cast = data.cast;
  console.log(cast);

  return (
    <>
    <Paper component="ul" sx={{ p: 0}}>
    <Typography variant="h4" component="h4" sx={{backgroundColor: '#da614e'}}>
        Overview
      </Typography>

      <Typography variant="h6" component="p">
        {movie.overview}
      </Typography>
    </Paper>

      <Paper component="ul" sx={root} >
        <li>
          <Chip label="Genres" sx={chip} color="primary" />
        </li>
        {movie.genres.map((g) => (
          <li key={g.name}>
            <Chip label={g.name} sx={chip} />
          </li>
        ))}
      </Paper>

      <Paper component="ul" sx={root}>
        <Chip icon={<AccessTimeIcon />} label={`${movie.runtime} min`} sx={chip}/>
        <Chip icon={<MonetizationIcon />} label={`${movie.revenue.toLocaleString()}`} sx={chip} />
        <Chip icon={<StarRate />} label={`${movie.vote_average} (${movie.vote_count})`} sx={chip} />
        <Chip label={`Released: ${movie.release_date}`} sx={chip}/>
      </Paper>
      
      <Paper component="ul" sx={root}>
        <li>
          <Chip label="Production Countries" sx={chip} color="primary" />
        </li>

        {movie.production_countries.map((c) => (
          <li key={c.name}>
            <Chip label={c.name} sx={chip} />
          </li>
        ))}
      </Paper>

      <Paper component="ul" sx={root}>
        <li>
          <Chip label="Spoken Languages" sx={chip} color="primary" />
        </li>
        {movie.spoken_languages.map((l) => (
            <li key={l.english_name}>
              <Chip label={l.english_name} sx={chip} />
            </li>
        ))}
      </Paper>

      <Paper component="ul" sx={root}>
        <Typography sx={{ fontSize: 18, m: 1 }} variant="subtitle1" gutterBottom>
          Links
        </Typography>
        <a target="_blank" rel="noreferrer" href={`https://www.imdb.com/title/${movie.imdb_id}`} style={{textDecoration: 'none', display: 'contents'}}>
          <Button sx={{maxWidth: '8%'}} variant="contained" endIcon={<LinkIcon />}>IMDB</Button>
        </a>
      </Paper>

      <Paper component="ul" sx={{ p: 0}}>
        <Grid container sx={{ m: 0 }}>
          <Grid item xs={12}>
            <Typography variant="h4" component="h4" sx={{backgroundColor: '#da614e'}}>
              Production Companies
            </Typography>
          </Grid>
          <Grid item container spacing={5} sx={{ m: 0}} style={{justifyContent: 'center'}}>
            {movie.production_companies.map((pc) => (
              <Card key={pc.id} sx={{ minWidth: 200, p: 1}}>
                <CardHeader
                  title={
                    <Typography variant="h5" component="p"
                      sx={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: "1",
                      WebkitBoxOrient: "vertical",
                      }}
                    >
                      {pc.name}{" "}
                    </Typography>
                  }
                />
                <CardMedia
                  sx={{ height: 200, minWidth: 200}}
                  style={{
                    backgroundSize: 'contain' 
                  }}
                  image={
                      pc.logo_path
                      ? `https://image.tmdb.org/t/p/w500/${pc.logo_path}`
                      : img
                  }
                />
              </Card>
            ))}
          </Grid>
        </Grid>
      </Paper>

      <Paper component="ul" sx={{ p: 0}}>
        <Typography variant="h4" component="h4" sx={{backgroundColor: '#da614e'}}>
          Cast
        </Typography>
          
          {!isLoading && 
            <Grid item container spacing={5} sx={{p: 2}}>
              {cast.map((c) => (
                 <Grid key={c.credit_id} item xs={12} sm={6} md={3} lg={3} xl={3}>
                  <Tilt className="parallax-effect-glare-scale"
                    perspective={500}
                    glareEnable={false}
                    glareMaxOpacity={0.45}
                    transitionSpeed={1500}
                    style={{borderRadius: '15px', borderStyle: 'solid', borderWidth: '2px', borderColor: '#000000', backgroundColor: '#060606'}}
                  >
                <Card sx={{borderRadius: '15px', backgroundColor: '#060606'}}>
                    <CardHeader 
                      sx={{backgroundColor: '#121212'}}
                      avater={
                        c.favourite ? (
                        <Avatar sx={{ backgroundColor: 'red' }}>
                            <FavoriteIcon />
                        </Avatar>
                        ) : null
                      }
                      title={
                          <Typography variant="h5" component="p"
                          sx={{
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          display: "-webkit-box",
                          WebkitLineClamp: "1",
                          WebkitBoxOrient: "vertical",
                          }}
                      >
                        {c.name}{" "}
                      </Typography>
                        }
                      />
                      <Link to={`/actors/${c.id}`}>
                          <CardMedia
                          sx={{ height: 400, borderRadius: '15px', borderStyle: 'solid', borderWidth: '2px', borderColor: '#da614e', backgroundColor: '#121212', m : 1}}
                          image={
                              c.profile_path
                              ? `https://image.tmdb.org/t/p/w500/${c.profile_path}`
                              : img
                          }
                          />
                      </Link>
                      <CardContent sx={{backgroundColor: '#121212'}}>
                      <Typography variant="overline" component="p">
                        Character
                      </Typography>
                      <Grid container style={{display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center'}}>
                        <Grid item xs={8}>
                            <Typography variant="subtitle2" component="p">
                                {c.character}
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                          <Typography variant="h6" component="p">
                              <Tooltip title="Popularity: based on number of views for the day" arrow>
                                  <StarRateIcon fontSize="small" sx={{color: "gold"}} />
                              </Tooltip>
                              {"  "} {parseFloat(c.popularity).toFixed(1)}{" "}
                          </Typography>
                        </Grid>
                      </Grid>
                      </CardContent>
                </Card>
                </Tilt>
                </Grid>
              ))}
            </Grid>
          }
      </Paper>

      <Fab
        color="secondary"
        variant="extended"
        onClick={() => setDrawerOpen(true)}
        sx={{
            position: "fixed",
            bottom: '1em',
            right: '1em'
        }}
      >
        <NavigationIcon />
        Reviews
      </Fab>
      <Drawer anchor="top" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <MovieReviews movie={movie} />
      </Drawer>
      </>
  );
};
export default MovieDetails ;