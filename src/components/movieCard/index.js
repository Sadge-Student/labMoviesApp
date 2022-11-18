import React, { useContext } from "react"
import { Link } from "react-router-dom"
import Avatar from "@mui/material/Avatar"
import Card from "@mui/material/Card"
import CardActions from "@mui/material/CardActions"
import CardContent from "@mui/material/CardContent"
import CardMedia from "@mui/material/CardMedia"
import CardHeader from "@mui/material/CardHeader"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import FavoriteIcon from "@mui/icons-material/Favorite"
import CalendarIcon from "@mui/icons-material/CalendarTodayTwoTone"
import StarRateIcon from "@mui/icons-material/StarRate"
import Grid from "@mui/material/Grid"
import { MoviesContext } from "../../contexts/moviesContext"
import img from '../../images/film-poster-placeholder.png'
import Tilt from "react-parallax-tilt";

export default function MovieCard({movie, action}) {
  const { favourites, addToFavourites } = useContext(MoviesContext);

  if (favourites.find((id) => id === movie.id)) {
    movie.favourite = true;
  } else {
    movie.favourite = false;
  }

  const handleAddToFavourite = (e) => {
    e.preventDefault();
    addToFavourites(movie);
  };
  
  return (
    <Card sx={{ maxWidth: 345 }}>
      <Tilt className="parallax-effect-glare-scale"
            perspective={500}
            glareEnable={true}
            glareMaxOpacity={0.45}
            transitionSpeed={1500}
      >
        <CardHeader 
          avater={
            movie.favourite ? (
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
              // height: "64.3px"
            }}
            >
              {movie.title}{" "}
            </Typography>
          }
          />
          <Link to={`/movies/${movie.id}`}>
        <CardMedia
          sx={{ height: 400 }}
          image={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
              : img
          }
          />
        </Link>
        <CardContent>
          <Grid container>
            <Grid item xs={8}>
              <Typography variant="h6" component="p">
                <CalendarIcon fontSize="small" />
                {movie.release_date}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="h6" component="p">
                <StarRateIcon fontSize="small" sx={{color: "gold"}} />
                {"  "} {parseFloat(movie.vote_average).toFixed(1)}{" "}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Tilt>
      <CardActions disableSpacing>
        {action(movie)}
        <Link to={`/movies/${movie.id}`} style={{ textDecoration: 'none' }}>
          <Button variant="outlined" size="medium" color="primary">
            More Info ...
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
}