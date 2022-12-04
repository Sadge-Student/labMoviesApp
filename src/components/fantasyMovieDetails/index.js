import React from "react";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography"
import Grid from "@mui/material/Grid";
import Tilt from "react-parallax-tilt";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import Avatar from "@mui/material/Avatar";
import FavoriteIcon from "@mui/icons-material/Favorite";
import img from "../../images/no-image.png";
import dayjs from "dayjs";

const root = {
    display: "flex",
    flexWrap: "wrap",
    listStyle: "none",
    margin: 0,
    flexDirection: "column",
    padding: 0
};

const chip = { margin: 0.5, maxWidth: "10%" };

const FantasyMovieDetails = ({ movie }) => {
    let day = dayjs.unix(movie.movieReleaseDate.seconds).$d.getDate();
    let month = dayjs.unix(movie.movieReleaseDate.seconds).$d.getMonth() + 1;
    let year = dayjs.unix(movie.movieReleaseDate.seconds).$d.getFullYear();
    let date = String(day + '/' + month + '/' + year);
    return (
        <>
        <Paper component="ul" sx={root} >
            <Typography variant="h4" component="h4" sx={{backgroundColor: '#da614e'}}>
                {`${movie.movieName} Information`}
            </Typography>
            <li>
            <Chip label="Genres" sx={chip} color="primary" />
            </li>
            <li key={movie.movieGenre}>
                <Chip label={movie.movieGenre} sx={chip} />
            </li>
        </Paper>

        <Paper component="ul" sx={root}>
            <Chip label={`Released: ${date}`} sx={chip}/>
        </Paper>

        <Paper component="ul" sx={{ p: 0}}>
            <Typography variant="h4" component="h4" sx={{backgroundColor: '#da614e'}}>
            Cast
            </Typography>
            <Grid item container spacing={5} sx={{p: 2}}>
            {movie.movieCast.map((c) => (
                <Grid key={c.castName} item xs={12} sm={6} md={3} lg={3} xl={3}>
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
                                <Typography variant="h5" component="p" color="common.white"
                                sx={{
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                display: "-webkit-box",
                                WebkitLineClamp: "1",
                                WebkitBoxOrient: "vertical",
                                }}
                                >
                                {c.castName}{" "}
                                </Typography>
                            }
                            />
                            <CardMedia
                                sx={{ height: 400, borderRadius: '15px', borderStyle: 'solid', borderWidth: '2px', borderColor: '#da614e', backgroundColor: '#121212', m : 1}}
                                image={
                                    c.castImageURL
                                    ? `${c.castImageURL}`
                                    : img
                                }
                            />
                            <CardContent sx={{backgroundColor: '#121212'}}>
                            <Typography variant="overline" component="p" color="common.white">
                                Character
                            </Typography>
                            <Grid container style={{display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center'}}>
                                <Grid item xs={8}>
                                    <Typography variant="subtitle2" component="p" color="common.white">
                                        {c.castCharacterName}
                                    </Typography>
                                </Grid>
                            </Grid>
                            </CardContent>
                        </Card>
                    </Tilt>

                </Grid>
              ))}
              </Grid>
        </Paper>
        </>
  );
}
export default FantasyMovieDetails;