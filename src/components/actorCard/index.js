import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ActorsContext } from "../../contexts/actorsContext";
import img from "../../images/film-poster-placeholder.png";
import Tilt from "react-parallax-tilt";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import Tooltip from "@mui/material/Tooltip";
import StarRateIcon from "@mui/icons-material/StarRate";
import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";
import LinkIcon from "@mui/icons-material/Link";

export default function ActorCard({actor, action}) {
    const { favourites, addToFavourites } = useContext(ActorsContext);

    if (favourites.find((id) => id === actor.id)) {
        actor.favourite = true;
      } else {
        actor.favourite = false;
      }

    const handleAddToFavourite = (e) => {
        e.preventDefault();
        addToFavourites(actor);
    }

    return (
        <Card sx={{ maxWidth: 345}}>
            <Tilt className="parallax-effect-glare-scale"
                  perspective={500}
                  glareEnable={true}
                  glareMaxOpacity={0.45}
                  transitionSpeed={1500}
                  >
                    <CardHeader 
                        avater={
                            actor.favourite ? (
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
                        {actor.name}{" "}
                        </Typography>
                        }
                    />
                    <Link to={`/actors/${actor.id}`}>
                        <CardMedia
                        sx={{ height: 400 }}
                        image={
                            actor.profile_path
                            ? `https://image.tmdb.org/t/p/w500/${actor.profile_path}`
                            : img
                        }
                        />
                    </Link>
                    </Tilt>
                    <CardContent>
                    {actor.known_for !== undefined && <>
                        <Typography variant="overline" component="p">
                            Known For
                        </Typography>
                        <Grid container style={{display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center'}}>
                            <Grid item xs={8}>
                                {actor.known_for.map((kf) => {
                                    return (
                                        <Typography key={kf.id} variant="subtitle2" component="p">
                                            {kf.title}
                                        </Typography>
                                    );
                                })}
                            </Grid>
                            <Grid item xs={4}>
                            <Typography variant="h6" component="p">
                                <Tooltip title="Popularity: based on number of views for the day" arrow>
                                    <StarRateIcon fontSize="small" sx={{color: "gold"}} />
                                </Tooltip>
                                {"  "} {parseFloat(actor.popularity).toFixed(1)}{" "}
                            </Typography>
                            </Grid>
                        </Grid>
                    </>}
                    {actor.known_for === undefined && <>
                        <Typography variant="overline" component="p">
                            Links
                        </Typography>
                        <Grid container style={{display: 'flex', flexWrap: 'wrap'}}>
                            <Grid item xs={8}>
                            <a target="_blank" rel="noreferrer" href={`https://www.imdb.com/title/${actor.imdb_id}`} style={{textDecoration: 'none', display: 'contents'}}>
                                <Button sx={{minWidth: '10%'}} variant="contained" endIcon={<LinkIcon />}>IMDB</Button>
                            </a>
                            </Grid>
                            <Grid item xs={4}>
                            <Typography variant="h6" component="p" sx={{leftMargin: '66px', width: '100px'}}>
                                <Tooltip title="Popularity: based on number of views for the day" arrow>
                                    <StarRateIcon fontSize="small" sx={{color: "gold"}} />
                                </Tooltip>
                                {"  "} {parseFloat(actor.popularity).toFixed(1)}{" "}
                            </Typography>
                            </Grid>
                        </Grid>
                    </>}
                    </CardContent>
                    <CardActions disableSpacing>
                    {action(actor)}
                    <Link to={`/actors/${actor.id}`} style={{ textDecoration: 'none' }}>
                    <Button variant="outlined" size="medium" color="primary">
                        More Info ...
                    </Button>
                    </Link>
                </CardActions>
        </Card>
    );
};