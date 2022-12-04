import React from "react"
import { Link } from "react-router-dom"
import Tilt from "react-parallax-tilt";
import img from "../../images/film-poster-placeholder.png";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CalendarIcon from "@mui/icons-material/CalendarTodayTwoTone";
import Grid from "@mui/material/Grid";
import dayjs from "dayjs";

export default function FantasyMovie({ movie }) {
    let day = dayjs.unix(movie.movieReleaseDate.seconds).$d.getDate();
    let month = dayjs.unix(movie.movieReleaseDate.seconds).$d.getMonth() + 1;
    let year = dayjs.unix(movie.movieReleaseDate.seconds).$d.getFullYear();
    let date = String(day + '/' + month + '/' + year);
    
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
                }}
                >
                  {movie.movieName}{" "}
                </Typography>
              }
              />
              <Link to={`/fantasy-movies/${movie.movieName}`}>
            <CardMedia
              sx={{ height: 400 }}
              image={
                movie.movieImageURL
                  ? `${movie.movieImageURL}`
                  : img
              }
              />
            </Link>
            <CardContent>
              <Grid container>
                <Grid item xs={8}>
                  <Typography variant="h6" component="p">
                    <CalendarIcon fontSize="small" />
                    {date}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Tilt>
          <CardActions disableSpacing>
            <Link to={`/movies/${movie.id}`} style={{ textDecoration: 'none' }}>
              <Button variant="outlined" size="medium" color="primary">
                More Info ...
              </Button>
            </Link>
          </CardActions>
        </Card>
      );
}